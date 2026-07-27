// 全商英検3級の問題データセット

const LESSONS = [
    {
        id: 1,
        title: "ビジネス基本用語 - 1",
        description: "取引に関する基本的な英単語",
        difficulty: "easy",
        questions: [
            {
                id: "q1-1",
                type: "flashcard",
                english: "invoice",
                meaning: "請求書",
                audio: "invoice"
            },
            {
                id: "q1-2",
                type: "flashcard",
                english: "quotation",
                meaning: "見積書",
                audio: "quotation"
            },
            {
                id: "q1-3",
                type: "choice",
                question: "「納期」を英語で言うと？",
                options: ["delivery date", "delivery time", "send date", "send time"],
                correct: 0
            },
            {
                id: "q1-4",
                type: "flashcard",
                english: "purchase order",
                meaning: "発注書",
                audio: "purchase-order"
            },
            {
                id: "q1-5",
                type: "choice",
                question: "下記の文の空欄に入る適切な単語は？\n'We need the goods by _____ (期限).'",
                options: ["deadline", "schedule", "plan", "limit"],
                correct: 0
            }
        ]
    },
    {
        id: 2,
        title: "ビジネス基本用語 - 2",
        description: "支払いと商業に関する用語",
        difficulty: "easy",
        questions: [
            {
                id: "q2-1",
                type: "flashcard",
                english: "payment",
                meaning: "支払い",
                audio: "payment"
            },
            {
                id: "q2-2",
                type: "flashcard",
                english: "discount",
                meaning: "割引",
                audio: "discount"
            },
            {
                id: "q2-3",
                type: "choice",
                question: "「銀行振込」を英語で言うと？",
                options: ["bank transfer", "bank payment", "bank remittance", "bank deposit"],
                correct: 0
            },
            {
                id: "q2-4",
                type: "flashcard",
                english: "tax",
                meaning: "税金",
                audio: "tax"
            },
            {
                id: "q2-5",
                type: "choice",
                question: "下記の文の空欄に入る適切な単語は？\n'We offer a 10% _____ for bulk orders.'",
                options: ["discount", "reduction", "decrease", "cut"],
                correct: 0
            }
        ]
    },
    {
        id: 3,
        title: "日常ビジネス表現 - 1",
        description: "初心者向けの基本表現",
        difficulty: "easy",
        questions: [
            {
                id: "q3-1",
                type: "choice",
                question: "顧客に商品について説明するときの適切な表現は？",
                options: ["This product features...", "This product looks like...", "This product seems...", "This product appears..."],
                correct: 0
            },
            {
                id: "q3-2",
                type: "choice",
                question: "「在庫がある」を英語で言うと？",
                options: ["in stock", "on stock", "at stock", "have stock"],
                correct: 0
            },
            {
                id: "q3-3",
                type: "flashcard",
                english: "availability",
                meaning: "在庫状況、利用可能性",
                audio: "availability"
            },
            {
                id: "q3-4",
                type: "choice",
                question: "納期延期をお詫びする際の最適な表現は？",
                options: ["We apologize for the delay.", "We are sorry for the delay.", "We regret the delay.", "We apologize the delay."],
                correct: 0
            },
            {
                id: "q3-5",
                type: "choice",
                question: "下記の文の空欄に入る適切な単語は？\n'Your _____ is important to us.'",
                options: ["feedback", "opinion", "comment", "thought"],
                correct: 0
            }
        ]
    },
    {
        id: 4,
        title: "メール表現 - 基本",
        description: "ビジネスメールの基本表現",
        difficulty: "medium",
        questions: [
            {
                id: "q4-1",
                type: "choice",
                question: "メールの冒頭に使う最も丁寧な敬礼は？",
                options: ["Dear Sir/Madam,", "Hi there,", "Hello,", "Hi,"],
                correct: 0
            },
            {
                id: "q4-2",
                type: "choice",
                question: "メール末尾で最も一般的な閉じ方は？",
                options: ["Best regards,", "See you,", "Take care,", "Goodbye,"],
                correct: 0
            },
            {
                id: "q4-3",
                type: "choice",
                question: "下記の文は何を示していますか？\n'Thank you for your inquiry.'",
                options: ["問い合わせへのお礼", "質問への返答", "提案の拒否", "業務の完了"],
                correct: 0
            },
            {
                id: "q4-4",
                type: "choice",
                question: "「ご不便をおかけして申し訳ございません」を英語で言うと？",
                options: ["We apologize for any inconvenience.", "We are sorry for trouble.", "We regret the problems.", "We apologize for problems."],
                correct: 0
            },
            {
                id: "q4-5",
                type: "flashcard",
                english: "sincerely",
                meaning: "敬具、真摯に",
                audio: "sincerely"
            }
        ]
    },
    {
        id: 5,
        title: "簡易取引文書読解",
        description: "実際の商業文書を読む練習",
        difficulty: "medium",
        questions: [
            {
                id: "q5-1",
                type: "choice",
                question: "invoiceの主な内容は？",
                options: ["商品またはサービスの請求詳細", "商品の注文内容", "見積金額", "納期予定"],
                correct: 0
            },
            {
                id: "q5-2",
                type: "choice",
                question: "quotationに通常含まれるのは？",
                options: ["価格と有効期限", "支払い方法の指定", "配送方法の詳細", "商品の在庫確認"],
                correct: 0
            },
            {
                id: "q5-3",
                type: "choice",
                question: "purchase orderの目的は？",
                options: ["売り手に商品購入を指示する", "商品の価格を提案する", "取引条件を説明する", "商品を返品する"],
                correct: 0
            },
            {
                id: "q5-4",
                type: "choice",
                question: "\"Terms of Payment\"で示されるのは？",
                options: ["支払い条件", "配送条件", "返品条件", "保証条件"],
                correct: 0
            },
            {
                id: "q5-5",
                type: "choice",
                question: "\"FOB\"の意味は？",
                options: ["本船上で危険負担が移転する取引条件", "工場の出荷地点での料金", "完全な配送込みの料金", "自由に選べる配送方法"],
                correct: 0
            }
        ]
    }
];

// ローカルストレージキー
const STORAGE_KEY = "eiken3LearningApp";

// ストレージの初期値
const DEFAULT_STORAGE = {
    streakDays: 0,
    lastLearned: null,
    totalSeconds: 0,
    completedLessons: [],
    lessonStats: {},
    // lessonStats[lessonId] = { attempts: n, completed: true/false, lastAttempt: date }
};

// ストレージ操作
function getStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(DEFAULT_STORAGE));
}

function setStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function addCompletedLesson(lessonId) {
    const storage = getStorage();
    if (!storage.completedLessons.includes(lessonId)) {
        storage.completedLessons.push(lessonId);
    }
    const today = new Date().toISOString().split('T')[0];
    if (!storage.lessonStats[lessonId]) {
        storage.lessonStats[lessonId] = { attempts: 0, completed: false, lastAttempt: null };
    }
    storage.lessonStats[lessonId].attempts++;
    storage.lessonStats[lessonId].completed = true;
    storage.lessonStats[lessonId].lastAttempt = today;
    
    // ストリークの更新
    const lastLearned = storage.lastLearned;
    const today_date = new Date();
    today_date.setHours(0, 0, 0, 0);
    const lastLearned_date = lastLearned ? new Date(lastLearned) : null;
    if (lastLearned_date) {
        lastLearned_date.setHours(0, 0, 0, 0);
    }
    
    if (!lastLearned) {
        storage.streakDays = 1;
    } else if (
        today_date.getTime() - lastLearned_date.getTime() === 24 * 60 * 60 * 1000
    ) {
        storage.streakDays++;
    } else if (
        today_date.getTime() === lastLearned_date.getTime()
    ) {
        // 同じ日
    } else {
        storage.streakDays = 1;
    }
    
    storage.lastLearned = today;
    setStorage(storage);
}

function addLearningTime(seconds) {
    const storage = getStorage();
    storage.totalSeconds += seconds;
    setStorage(storage);
}

function resetAllData() {
    if (confirm('全てのデータをリセットしますか？この操作は取り消せません。')) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}
