// メインアプリケーションロジック

let currentLesson = null;
let currentQuestionIndex = 0;
let lessonStartTime = null;
let userAnswers = [];

// 画面遷移管理
function showScreen(screenName) {
    document.getElementById('homeScreen').classList.remove('active');
    document.getElementById('lessonScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.remove('active');
    document.getElementById(screenName).classList.add('active');
}

// ========== ホーム画面関連 ==========
function initializeHome() {
    showScreen('homeScreen');
    updateStats();
    renderLessonsList();
}

function updateStats() {
    const storage = getStorage();
    
    // ストリーク表示
    document.getElementById('streakValue').textContent = storage.streakDays;
    
    // 総学習時間
    const hours = Math.floor(storage.totalSeconds / 3600);
    const minutes = Math.floor((storage.totalSeconds % 3600) / 60);
    let timeStr = '';
    if (hours > 0) {
        timeStr = `${hours}時間${minutes}分`;
    } else {
        timeStr = `${minutes}分`;
    }
    document.getElementById('totalTimeValue').textContent = timeStr;
    
    // 本日の進捗
    const today = new Date().toISOString().split('T')[0];
    const todayCompleted = Object.values(storage.lessonStats)
        .filter(stat => stat.lastAttempt === today && stat.completed)
        .length;
    
    document.getElementById('completedToday').textContent = todayCompleted;
    document.getElementById('totalLessonsCount').textContent = LESSONS.length;
    
    const progressPercent = (todayCompleted / LESSONS.length) * 100;
    document.getElementById('dailyProgressFill').style.width = progressPercent + '%';
}

function renderLessonsList() {
    const storage = getStorage();
    const today = new Date().toISOString().split('T')[0];
    const lessonsList = document.getElementById('lessonsList');
    lessonsList.innerHTML = '';
    
    LESSONS.forEach(lesson => {
        const btn = document.createElement('button');
        btn.className = 'lesson-btn';
        
        const stat = storage.lessonStats[lesson.id] || { attempts: 0, completed: false, lastAttempt: null };
        const isCompletedToday = stat.lastAttempt === today && stat.completed;
        
        let statusText = stat.completed ? `✓ 完了（${stat.attempts}回）` : '未完了';
        if (isCompletedToday) {
            statusText = '✓ 本日完了';
        }
        
        btn.innerHTML = `
            <span class="lesson-title">${lesson.id}. ${lesson.title}</span>
            <span class="lesson-status">${lesson.description} • ${statusText}</span>
        `;
        
        btn.onclick = () => startLesson(lesson.id);
        lessonsList.appendChild(btn);
    });
}

// ========== レッスン画面関連 ==========
function startLesson(lessonId) {
    currentLesson = LESSONS.find(l => l.id === lessonId);
    currentQuestionIndex = 0;
    lessonStartTime = Date.now();
    userAnswers = [];
    
    showScreen('lessonScreen');
    renderLesson();
}

function renderLesson() {
    // タイトル
    document.getElementById('lessonTitle').textContent = 
        `${currentLesson.title} (${currentQuestionIndex + 1}/${currentLesson.questions.length})`;
    
    // プログレスインジケーター
    const progressIndicator = document.getElementById('progressIndicator');
    progressIndicator.innerHTML = '';
    currentLesson.questions.forEach((q, idx) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        if (idx < currentQuestionIndex) {
            dot.classList.add('completed');
        } else if (idx === currentQuestionIndex) {
            dot.classList.add('current');
        }
        progressIndicator.appendChild(dot);
    });
    
    // 問題表示
    const question = currentLesson.questions[currentQuestionIndex];
    const questionArea = document.getElementById('questionArea');
    questionArea.innerHTML = '';
    
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    
    if (question.type === 'flashcard') {
        renderFlashcard(question, questionArea);
    } else if (question.type === 'choice') {
        renderChoice(question, questionArea, nextBtn);
    }
}

function renderFlashcard(question, container) {
    const card = document.createElement('div');
    card.className = 'flashcard';
    
    const front = document.createElement('div');
    front.className = 'flashcard-front';
    front.textContent = question.english;
    
    const hint = document.createElement('div');
    hint.className = 'flashcard-hint';
    hint.textContent = 'タップして意味を表示';
    
    let isFlipped = false;
    
    card.appendChild(front);
    card.appendChild(hint);
    
    card.onclick = () => {
        if (!isFlipped) {
            front.className = 'flashcard-back';
            front.textContent = question.meaning;
            hint.textContent = 'タップして次へ進む';
            isFlipped = true;
        } else {
            userAnswers.push({ questionId: question.id, type: 'flashcard', correct: true });
            nextQuestion();
        }
    };
    
    container.appendChild(card);
}

function renderChoice(question, container, nextBtn) {
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = question.question;
    container.appendChild(questionText);
    
    const options = document.createElement('div');
    options.className = 'options';
    
    question.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        
        btn.onclick = () => selectOption(idx, question.correct, btn, question, nextBtn);
        options.appendChild(btn);
    });
    
    container.appendChild(options);
}

function selectOption(selectedIdx, correctIdx, btn, question, nextBtn) {
    const isCorrect = selectedIdx === correctIdx;
    
    // フィードバック表示
    const options = btn.parentElement.querySelectorAll('.option-btn');
    options.forEach(b => b.disabled = true);
    
    if (isCorrect) {
        btn.classList.add('correct');
    } else {
        btn.classList.add('incorrect');
        options[correctIdx].classList.add('correct');
    }
    
    userAnswers.push({
        questionId: question.id,
        type: 'choice',
        selectedIdx: selectedIdx,
        correct: isCorrect
    });
    
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= currentLesson.questions.length) {
        completeLesson();
    } else {
        renderLesson();
    }
}

function exitLesson() {
    if (confirm('レッスンを終了しますか？進捗は保存されません。')) {
        currentLesson = null;
        currentQuestionIndex = 0;
        userAnswers = [];
        initializeHome();
    }
}

// ========== 結果画面関連 ==========
function completeLesson() {
    // 統計を保存
    const correctCount = userAnswers.filter(a => a.correct).length;
    const totalCount = userAnswers.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    const elapsedSeconds = Math.floor((Date.now() - lessonStartTime) / 1000);
    
    addCompletedLesson(currentLesson.id);
    addLearningTime(elapsedSeconds);
    
    // 結果画面の表示
    document.getElementById('resultScore').textContent = `${percentage}%`;
    
    let message = '';
    if (percentage === 100) {
        message = 'パーフェクト！🎉';
    } else if (percentage >= 80) {
        message = '素晴らしい！';
    } else if (percentage >= 60) {
        message = 'よくできました！';
    } else {
        message = 'もう一度チャレンジしましょう！';
    }
    document.getElementById('resultMessage').textContent = message;
    
    document.getElementById('correctCount').textContent = `${correctCount} / ${totalCount}`;
    
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    let timeStr = '';
    if (minutes > 0) {
        timeStr = `${minutes}分${seconds}秒`;
    } else {
        timeStr = `${seconds}秒`;
    }
    document.getElementById('completionTime').textContent = timeStr;
    
    showScreen('resultScreen');
}

function goHome() {
    currentLesson = null;
    currentQuestionIndex = 0;
    userAnswers = [];
    initializeHome();
}

function retryLesson() {
    const lessonId = currentLesson.id;
    goHome();
    setTimeout(() => startLesson(lessonId), 300);
}

// ========== 初期化 ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeHome();
});
