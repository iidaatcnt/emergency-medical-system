'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Stethoscope, Award, Target, Plus, Edit, Trash2, X, Calendar, TrendingUp, FileText, Settings, Users, LogOut, User, AlertCircle } from 'lucide-react';
const EmergencyMedicalLearningSystem = () => {
  // カテゴリー設定
  const categoryConfig = {
    '循環器': { icon: Heart, color: 'bg-red-500' },
    '呼吸器': { icon: Brain, color: 'bg-blue-500' },
    '外傷': { icon: Stethoscope, color: 'bg-green-500' }
  };

  // 初期ユーザーデータ
  const initialUsers = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      name: '管理者',
      role: 'admin',
      email: 'admin@example.com',
      institution: 'システム管理'
    },
    {
      id: 2,
      username: 'tanaka',
      password: 'pass123',
      name: '田中 太郎',
      role: 'student',
      email: 'tanaka@example.com',
      institution: '東京救急救命士専門学校',
      progress: {
        totalQuestions: 6,
        correctAnswers: 4,
        correctRate: 67,
        loginStreak: 7,
        learningHistory: [
          { date: '2024-06-01', questionsAnswered: 2, correctAnswers: 1, timeSpent: 15 },
          { date: '2024-06-02', questionsAnswered: 2, correctAnswers: 2, timeSpent: 12 },
          { date: '2024-06-03', questionsAnswered: 2, correctAnswers: 1, timeSpent: 18 }
        ],
        categoryProgress: {
          '循環器': { correct: 1, total: 2, progress: 50 },
          '呼吸器': { correct: 2, total: 3, progress: 67 },
          '外傷': { correct: 1, total: 1, progress: 100 }
        }
      }
    }
  ];

  // 初期問題データ
  const initialQuestions = [
    {
      id: 1,
      category: '循環器',
      question: '心停止患者に対する胸骨圧迫について正しいのはどれか。',
      options: [
        '圧迫の深さは3cm以上とする',
        '圧迫のテンポは100〜120回/分とする',
        '圧迫と換気の比は15:2とする',
        '圧迫位置は剣状突起の上とする',
        '圧迫は片手で行う'
      ],
      correctAnswers: [1],
      isMultipleChoice: false,
      explanation: '心停止患者への胸骨圧迫は、成人では100-120回/分のテンポで、少なくとも5cm（6cmを超えない）の深さで行います。',
      scenario: '119番通報により、意識不明で呼吸のない60歳男性のもとに出動しました。',
      createdAt: '2024-01-15',
      createdBy: 'admin'
    },
    {
      id: 2,
      category: '呼吸器',
      question: '気道閉塞が疑われる意識清明な成人患者への対応で最も適切なのはどれか。',
      options: [
        '直ちに気管挿管を行う',
        '腹部突き上げ法（ハイムリック法）を実施する',
        '仰臥位にして背部叩打法を行う',
        '酸素投与のみを行い経過観察する',
        '輪状甲状靭帯切開を準備する'
      ],
      correctAnswers: [1],
      isMultipleChoice: false,
      explanation: '意識清明な成人の気道閉塞では、まず腹部突き上げ法（ハイムリック法）を実施します。',
      scenario: 'レストランで食事中に突然呼吸困難を訴えた40歳女性。手で首を押さえ苦悶様表情を示しています。',
      createdAt: '2024-01-16',
      createdBy: 'admin'
    },
    {
      id: 3,
      category: '外傷',
      question: '交通事故による外傷患者の初期評価で最優先すべきはどれか。',
      options: [
        'バイタルサインの測定',
        '気道の確保と頸椎保護',
        '出血部位の確認',
        '意識レベルの評価',
        '四肢の骨折の確認'
      ],
      correctAnswers: [1],
      isMultipleChoice: false,
      explanation: 'ABCDEアプローチに従い、まずAirway（気道確保）を頸椎保護と同時に行います。',
      scenario: '高速道路での多重衝突事故。運転手が車内に挟まれた状態で発見されました。',
      createdAt: '2024-01-17',
      createdBy: 'admin'
    },
    {
      id: 4,
      category: '呼吸器',
      question: '慢性閉塞性肺疾患（COPD）の増悪で搬送された患者への酸素投与について、最も適切なのはどれか。2つ選べ。',
      options: [
        '15L/分の高濃度酸素を投与する',
        'SpO₂を90〜94%に維持する',
        '呼吸困難があるため100%酸素を投与する',
        '低濃度酸素から開始し様子を見る',
        'CO₂ナルコーシスに注意して投与する'
      ],
      correctAnswers: [1, 4],
      isMultipleChoice: true,
      explanation: 'COPD患者では低酸素血症に慣れているため、高濃度酸素投与によりCO₂ナルコーシスを起こす可能性があります。SpO₂は90-94%を目標とし、慎重に酸素投与を行います。',
      scenario: '70歳男性。慢性閉塞性肺疾患で通院中。本日朝から呼吸困難が増強し、家族が119番通報しました。',
      createdAt: '2024-01-18',
      createdBy: 'admin'
    },
    {
      id: 5,
      category: '呼吸器',
      question: '喘息発作で搬送された小児患者の観察で重篤度を判断する際、最も重要な所見はどれか。2つ選べ。',
      options: [
        '咳嗽の有無',
        '意識レベルの低下',
        'チアノーゼの出現',
        '発熱の程度',
        '喘鳴の消失'
      ],
      correctAnswers: [1, 4],
      isMultipleChoice: true,
      explanation: '重篤な喘息発作では、意識レベルの低下や喘鳴の消失（silent chest）が見られることがあり、これらは生命に関わる重要な所見です。',
      scenario: '8歳男児。気管支喘息の既往あり。夜間に突然の呼吸困難で救急要請されました。',
      createdAt: '2024-01-19',
      createdBy: 'admin'
    },
    {
      id: 6,
      category: '循環器',
      question: '胸痛を訴える患者で急性心筋梗塞を疑う際の観察項目として重要なのはどれか。2つ選べ。',
      options: [
        '胸痛の持続時間が20分以上',
        '体動時のみに出現する胸痛',
        '冷汗を伴う胸痛',
        '深呼吸で軽減する胸痛',
        '胸部を押さえると増強する胸痛'
      ],
      correctAnswers: [0, 2],
      isMultipleChoice: true,
      explanation: '急性心筋梗塞では、20分以上持続する胸痛や冷汗・悪心などの随伴症状が特徴的です。体動や深呼吸、圧迫で変化する胸痛は心臓以外の原因を考えます。',
      scenario: '55歳男性。職場で突然の胸痛を訴え、同僚が119番通報しました。',
      createdAt: '2024-01-20',
      createdBy: 'admin'
    }
  ];

  // 状態管理
  const [users, setUsers] = useState(initialUsers);
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // 問題演習関連
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // フォーム管理
  const [newQuestion, setNewQuestion] = useState({
    category: '循環器',
    question: '',
    options: ['', '', '', '', ''],
    correctAnswers: [],
    isMultipleChoice: false,
    explanation: '',
    scenario: ''
  });

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    name: '',
    role: 'student',
    email: '',
    institution: ''
  });

  // ログイン処理
  const handleLogin = () => {
    setLoginError('');
    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      setCurrentUser(user);
      setCurrentScreen(user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
      setLoginForm({ username: '', password: '' });
    } else {
      setLoginError('ユーザー名またはパスワードが正しくありません');
    }
  };

  // ログアウト処理
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setShowResult(false);
    setQuizResults([]);
    setShowSummary(false);
    setWrongAnswers([]);
    setIsReviewMode(false);
    setLoginError('');
  };

  // 進捗更新
  const updateUserProgress = (user, questionResult) => {
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        const today = new Date().toISOString().split('T')[0];
        const progress = u.progress || {
          totalQuestions: 0,
          correctAnswers: 0,
          correctRate: 0,
          loginStreak: 1,
          learningHistory: [],
          categoryProgress: {}
        };

        const newTotalQuestions = progress.totalQuestions + 1;
        const newCorrectAnswers = progress.correctAnswers + (questionResult.isCorrect ? 1 : 0);
        const newCorrectRate = Math.round((newCorrectAnswers / newTotalQuestions) * 100);

        // 分野別進捗の更新
        const categoryProgress = { ...progress.categoryProgress };
        const category = questionResult.category;
        if (!categoryProgress[category]) {
          categoryProgress[category] = { correct: 0, total: 0, progress: 0 };
        }
        categoryProgress[category].total += 1;
        if (questionResult.isCorrect) {
          categoryProgress[category].correct += 1;
        }
        categoryProgress[category].progress = Math.round(
          (categoryProgress[category].correct / categoryProgress[category].total) * 100
        );

        // 学習履歴の更新
        const learningHistory = [...progress.learningHistory];
        const todayIndex = learningHistory.findIndex(h => h.date === today);
        if (todayIndex >= 0) {
          learningHistory[todayIndex].questionsAnswered += 1;
          if (questionResult.isCorrect) {
            learningHistory[todayIndex].correctAnswers += 1;
          }
          learningHistory[todayIndex].timeSpent += 2; // 仮の時間
        } else {
          learningHistory.push({
            date: today,
            questionsAnswered: 1,
            correctAnswers: questionResult.isCorrect ? 1 : 0,
            timeSpent: 2
          });
        }

        return {
          ...u,
          progress: {
            ...progress,
            totalQuestions: newTotalQuestions,
            correctAnswers: newCorrectAnswers,
            correctRate: newCorrectRate,
            categoryProgress,
            learningHistory
          }
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    if (currentUser.id === user.id) {
      setCurrentUser(updatedUsers.find(u => u.id === user.id));
    }
  };

  // 回答処理
  const handleAnswer = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;
    let userAnswer;

    if (question.isMultipleChoice) {
      userAnswer = selectedAnswers;
      isCorrect = selectedAnswers.length === question.correctAnswers.length &&
        selectedAnswers.every(ans => question.correctAnswers.includes(ans));
    } else {
      userAnswer = selectedAnswer;
      isCorrect = question.correctAnswers.includes(selectedAnswer);
    }

    const result = {
      questionId: question.id,
      questionText: question.question,
      category: question.category,
      selectedAnswer: userAnswer,
      correctAnswer: question.correctAnswers,
      isCorrect,
      isMultipleChoice: question.isMultipleChoice,
      options: question.options
    };

    setQuizResults([...quizResults, result]);
    
    if (!isCorrect && !isReviewMode) {
      setWrongAnswers([...wrongAnswers, question]);
    }

    if (currentUser.role === 'student') {
      updateUserProgress(currentUser, result);
    }

    setShowResult(true);
  };

  // 次の問題へ
  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setSelectedAnswers([]);

    const questionPool = isReviewMode ? wrongAnswers : questions;
    
    if (currentQuestion < questionPool.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  // 問題追加
  const handleAddQuestion = () => {
    const question = {
      ...newQuestion,
      id: Math.max(...questions.map(q => q.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: currentUser.username,
      correctAnswers: newQuestion.isMultipleChoice ? 
        newQuestion.correctAnswers : 
        [newQuestion.correctAnswers[0]]
    };

    setQuestions([...questions, question]);
    setNewQuestion({
      category: '循環器',
      question: '',
      options: ['', '', '', '', ''],
      correctAnswers: [],
      isMultipleChoice: false,
      explanation: '',
      scenario: ''
    });
  };

  // ユーザー追加
  const handleAddUser = () => {
    const user = {
      ...newUser,
      id: Math.max(...users.map(u => u.id)) + 1,
      progress: {
        totalQuestions: 0,
        correctAnswers: 0,
        correctRate: 0,
        loginStreak: 0,
        learningHistory: [],
        categoryProgress: {}
      }
    };

    setUsers([...users, user]);
    setNewUser({
      username: '',
      password: '',
      name: '',
      role: 'student',
      email: '',
      institution: ''
    });
  };

  // 進捗リセット
  const resetMyProgress = () => {
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          progress: {
            totalQuestions: 0,
            correctAnswers: 0,
            correctRate: 0,
            loginStreak: u.progress?.loginStreak || 0,
            learningHistory: [],
            categoryProgress: {}
          }
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    setCurrentUser(updatedUsers.find(u => u.id === currentUser.id));
  };

  // 復習モード開始
  const startReviewMode = () => {
    if (wrongAnswers.length > 0) {
      setIsReviewMode(true);
      setCurrentQuestion(0);
      setQuizResults([]);
      setShowSummary(false);
      setCurrentScreen('quiz');
    }
  };

  // クイズ開始
  const startQuiz = () => {
    setIsReviewMode(false);
    setCurrentQuestion(0);
    setQuizResults([]);
    setWrongAnswers([]);
    setShowSummary(false);
    setCurrentScreen('quiz');
  };

  // ログイン画面
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              救急救命士学習システム
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">ユーザー名</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ユーザー名を入力"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">パスワード</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="パスワードを入力"
              />
            </div>
            {loginError && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{loginError}</span>
              </div>
            )}
            <Button 
              onClick={handleLogin} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!loginForm.username || !loginForm.password}
            >
              ログイン
            </Button>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
              <p className="font-medium text-gray-700 mb-2">デモアカウント:</p>
              <p className="text-gray-600">管理者: admin / admin123</p>
              <p className="text-gray-600">学生: tanaka / pass123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 管理者ダッシュボード
  if (currentScreen === 'admin-dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">管理者ダッシュボード</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{currentUser.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                ログアウト
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">総問題数</p>
                    <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">学生数</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {users.filter(u => u.role === 'student').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Settings className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">管理者</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {users.filter(u => u.role === 'admin').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 管理メニュー */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>問題管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => setCurrentScreen('question-management')}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  問題を管理
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ユーザー管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => setCurrentScreen('user-management')}
                  className="w-full"
                >
                  <Users className="h-4 w-4 mr-2" />
                  ユーザーを管理
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // 問題管理画面
  if (currentScreen === 'question-management') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentScreen('admin-dashboard')}
              >
                ← 戻る
              </Button>
              <h1 className="text-xl font-bold text-gray-900">問題管理</h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              ログアウト
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* 問題追加フォーム */}
          <Card>
            <CardHeader>
              <CardTitle>新しい問題を追加</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">カテゴリー</label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {Object.keys(categoryConfig).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">問題形式</label>
                  <select
                    value={newQuestion.isMultipleChoice ? 'multiple' : 'single'}
                    onChange={(e) => setNewQuestion({...newQuestion, isMultipleChoice: e.target.value === 'multiple'})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="single">単一選択</option>
                    <option value="multiple">複数選択</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">シナリオ（任意）</label>
                <textarea
                  value={newQuestion.scenario}
                  onChange={(e) => setNewQuestion({...newQuestion, scenario: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="現場状況を入力..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">問題文</label>
                <textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="問題文を入力..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">選択肢</label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type={newQuestion.isMultipleChoice ? "checkbox" : "radio"}
                      name="correct-answer"
                      checked={newQuestion.correctAnswers.includes(index)}
                      onChange={(e) => {
                        if (newQuestion.isMultipleChoice) {
                          if (e.target.checked) {
                            setNewQuestion({
                              ...newQuestion,
                              correctAnswers: [...newQuestion.correctAnswers, index]
                            });
                          } else {
                            setNewQuestion({
                              ...newQuestion,
                              correctAnswers: newQuestion.correctAnswers.filter(i => i !== index)
                            });
                          }
                        } else {
                          setNewQuestion({...newQuestion, correctAnswers: [index]});
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion({...newQuestion, options: newOptions});
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      placeholder={`選択肢 ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">解説</label>
                <textarea
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="解説を入力..."
                />
              </div>

              <Button 
                onClick={handleAddQuestion}
                disabled={!newQuestion.question || !newQuestion.explanation || newQuestion.correctAnswers.length === 0}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                問題を追加
              </Button>
            </CardContent>
          </Card>

          {/* 問題一覧 */}
          <Card>
            <CardHeader>
              <CardTitle>問題一覧 ({questions.length}問)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question) => {
                  const CategoryIcon = categoryConfig[question.category].icon;
                  return (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CategoryIcon className="h-4 w-4" />
                            <Badge variant="outline">{question.category}</Badge>
                            <Badge variant={question.isMultipleChoice ? "default" : "secondary"}>
                              {question.isMultipleChoice ? "複数選択" : "単一選択"}
                            </Badge>
                          </div>
                          {question.scenario && (
                            <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded mb-2">
                              <strong>シナリオ:</strong> {question.scenario}
                            </p>
                          )}
                          <h3 className="font-medium text-gray-900 mb-2">{question.question}</h3>
                          <div className="text-sm text-gray-600">
                            <p>正解: {question.correctAnswers.map(i => `${i + 1}. ${question.options[i]}`).join(', ')}</p>
                            <p className="mt-1">作成: {question.createdAt} by {question.createdBy}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setQuestions(questions.filter(q => q.id !== question.id));
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ユーザー管理画面
  if (currentScreen === 'user-management') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentScreen('admin-dashboard')}
              >
                ← 戻る
              </Button>
              <h1 className="text-xl font-bold text-gray-900">ユーザー管理</h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              ログアウト
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* ユーザー追加フォーム */}
          <Card>
            <CardHeader>
              <CardTitle>新しいユーザーを追加</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">ユーザー名</label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="ユーザー名"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">パスワード</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="パスワード"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">氏名</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="氏名"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">権限</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="student">学生</option>
                    <option value="admin">管理者</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">メールアドレス</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="メールアドレス"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">所属機関</label>
                  <input
                    type="text"
                    value={newUser.institution}
                    onChange={(e) => setNewUser({...newUser, institution: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="所属機関"
                  />
                </div>
              </div>

              <Button 
                onClick={handleAddUser}
                disabled={!newUser.username || !newUser.password || !newUser.name}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                ユーザーを追加
              </Button>
            </CardContent>
          </Card>

          {/* ユーザー一覧 */}
          <Card>
            <CardHeader>
              <CardTitle>ユーザー一覧 ({users.length}名)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{user.name}</span>
                          <Badge variant={user.role === 'admin' ? "default" : "secondary"}>
                            {user.role === 'admin' ? '管理者' : '学生'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>ユーザー名: {user.username}</p>
                          <p>メール: {user.email}</p>
                          <p>所属: {user.institution}</p>
                          {user.progress && (
                            <p>進捗: {user.progress.totalQuestions}問 / 正答率 {user.progress.correctRate}%</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (user.id !== currentUser.id) {
                            setUsers(users.filter(u => u.id !== user.id));
                          }
                        }}
                        disabled={user.id === currentUser.id}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 学生ダッシュボード
  if (currentScreen === 'student-dashboard') {
    const progress = currentUser.progress || {
      totalQuestions: 0,
      correctAnswers: 0,
      correctRate: 0,
      loginStreak: 0,
      learningHistory: [],
      categoryProgress: {}
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">学習ダッシュボード</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{currentUser.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                ログアウト
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* 学習統計 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">総問題数</p>
                    <p className="text-2xl font-bold text-gray-900">{progress.totalQuestions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">正答率</p>
                    <p className="text-2xl font-bold text-gray-900">{progress.correctRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">正解数</p>
                    <p className="text-2xl font-bold text-gray-900">{progress.correctAnswers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">連続日数</p>
                    <p className="text-2xl font-bold text-gray-900">{progress.loginStreak}日</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 分野別進捗 */}
          <Card>
            <CardHeader>
              <CardTitle>分野別学習進捗</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryConfig).map(([category, config]) => {
                  const categoryProgress = progress.categoryProgress[category] || { correct: 0, total: 0, progress: 0 };
                  const Icon = config.icon;
                  
                  return (
                    <div key={category} className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${config.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-900">{category}</span>
                          <span className="text-sm text-gray-600">
                            {categoryProgress.correct}/{categoryProgress.total} ({categoryProgress.progress}%)
                          </span>
                        </div>
                        <Progress value={categoryProgress.progress} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 学習履歴 */}
          <Card>
            <CardHeader>
              <CardTitle>最近の学習履歴</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {progress.learningHistory.slice(-5).map((history, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{history.date}</p>
                      <p className="text-sm text-gray-600">
                        {history.questionsAnswered}問回答 / {history.correctAnswers}問正解
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {Math.round((history.correctAnswers / history.questionsAnswered) * 100)}%
                      </p>
                      <p className="text-sm text-gray-600">{history.timeSpent}分</p>
                    </div>
                  </div>
                ))}
                {progress.learningHistory.length === 0 && (
                  <p className="text-gray-500 text-center py-4">学習履歴がありません</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 学習メニュー */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>問題演習</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={startQuiz} className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  問題演習を開始
                </Button>
                {wrongAnswers.length > 0 && (
                  <Button 
                    onClick={startReviewMode} 
                    variant="outline" 
                    className="w-full"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    復習モード ({wrongAnswers.length}問)
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>学習管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => setCurrentScreen('learning-analysis')} 
                  variant="outline" 
                  className="w-full"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  学習分析を見る
                </Button>
                <Button 
                  onClick={resetMyProgress} 
                  variant="outline" 
                  className="w-full text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  進捗をリセット
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // 学習分析画面
  if (currentScreen === 'learning-analysis') {
    const progress = currentUser.progress || {
      totalQuestions: 0,
      correctAnswers: 0,
      correctRate: 0,
      loginStreak: 0,
      learningHistory: [],
      categoryProgress: {}
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentScreen('student-dashboard')}
              >
                ← 戻る
              </Button>
              <h1 className="text-xl font-bold text-gray-900">学習分析</h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              ログアウト
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* 全体統計 */}
          <Card>
            <CardHeader>
              <CardTitle>全体統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{progress.totalQuestions}</div>
                  <div className="text-sm text-gray-600">総問題数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{progress.correctAnswers}</div>
                  <div className="text-sm text-gray-600">正解数</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{progress.correctRate}%</div>
                  <div className="text-sm text-gray-600">正答率</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 分野別詳細分析 */}
          <Card>
            <CardHeader>
              <CardTitle>分野別詳細分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(categoryConfig).map(([category, config]) => {
                  const categoryProgress = progress.categoryProgress[category] || { correct: 0, total: 0, progress: 0 };
                  const Icon = config.icon;
                  
                  return (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-2 rounded-lg ${config.color} text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">{categoryProgress.total}</div>
                          <div className="text-sm text-gray-600">出題数</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">{categoryProgress.correct}</div>
                          <div className="text-sm text-gray-600">正解数</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">{categoryProgress.progress}%</div>
                          <div className="text-sm text-gray-600">正答率</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Progress value={categoryProgress.progress} className="h-3" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 学習履歴詳細 */}
          <Card>
            <CardHeader>
              <CardTitle>学習履歴詳細</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {progress.learningHistory.map((history, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{history.date}</p>
                      <p className="text-sm text-gray-600">
                        学習時間: {history.timeSpent}分
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{history.questionsAnswered}問</p>
                      <p className="text-sm text-gray-600">出題数</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-green-600">{history.correctAnswers}問</p>
                      <p className="text-sm text-gray-600">正解数</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-purple-600">
                        {Math.round((history.correctAnswers / history.questionsAnswered) * 100)}%
                      </p>
                      <p className="text-sm text-gray-600">正答率</p>
                    </div>
                  </div>
                ))}
                {progress.learningHistory.length === 0 && (
                  <p className="text-gray-500 text-center py-8">学習履歴がありません</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 問題演習画面
  if (currentScreen === 'quiz') {
    const questionPool = isReviewMode ? wrongAnswers : questions;
    const question = questionPool[currentQuestion];
    
    if (!question) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">問題がありません</p>
              <Button 
                onClick={() => setCurrentScreen('student-dashboard')} 
                className="mt-4"
              >
                ダッシュボードに戻る
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (showSummary) {
      const correctCount = quizResults.filter(r => r.isCorrect).length;
      const totalCount = quizResults.length;
      const scorePercentage = Math.round((correctCount / totalCount) * 100);

      return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-xl font-bold text-gray-900">
                {isReviewMode ? '復習' : '問題演習'}結果
              </h1>
            </div>
          </header>

          <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* 結果サマリー */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {isReviewMode ? '復習完了！' : '演習完了！'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-blue-600">{scorePercentage}%</div>
                  <p className="text-lg text-gray-600">
                    {totalCount}問中 {correctCount}問正解
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                      <div className="text-sm text-gray-600">正解</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{totalCount - correctCount}</div>
                      <div className="text-sm text-gray-600">不正解</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 詳細結果 */}
            <Card>
              <CardHeader>
                <CardTitle>詳細結果</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizResults.map((result, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${
                      result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900">問題 {index + 1}</h3>
                        <Badge variant={result.isCorrect ? "success" : "destructive"}>
                          {result.isCorrect ? '正解' : '不正解'}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{result.questionText}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-600">あなたの回答: </span>
                          <span className="text-sm text-gray-900">
                            {result.isMultipleChoice
                              ? Array.isArray(result.selectedAnswer) 
                                ? result.selectedAnswer.map(i => `${i + 1}. ${result.options[i]}`).join(', ')
                                : '未回答'
                              : `${result.selectedAnswer + 1}. ${result.options[result.selectedAnswer]}`
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">正解: </span>
                          <span className="text-sm text-green-700">
                            {result.correctAnswer.map(i => `${i + 1}. ${result.options[i]}`).join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* アクション */}
            <div className="flex space-x-4">
              <Button 
                onClick={() => setCurrentScreen('student-dashboard')} 
                className="flex-1"
              >
                ダッシュボードに戻る
              </Button>
              {!isReviewMode && (
                <Button 
                  onClick={startQuiz} 
                  variant="outline" 
                  className="flex-1"
                >
                  もう一度挑戦
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (showResult) {
      const result = quizResults[quizResults.length - 1];
      
      return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900">回答結果</h1>
              <div className="text-sm text-gray-600">
                {currentQuestion + 1} / {questionPool.length}
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto p-4 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className={`text-center mb-6 ${
                  result.isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  <div className="text-4xl font-bold mb-2">
                    {result.isCorrect ? '正解！' : '不正解'}
                  </div>
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
                    result.isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {result.isCorrect ? (
                      <Award className="h-12 w-12 text-green-600" />
                    ) : (
                      <X className="h-12 w-12 text-red-600" />
                    )}
                  </div>
                </div>

                {question.scenario && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>シナリオ:</strong> {question.scenario}
                    </p>
                  </div>
                )}

                <h2 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h2>

                <div className="space-y-2 mb-6">
                  {question.options.map((option, index) => {
                    const isCorrect = question.correctAnswers.includes(index);
                    const isSelected = question.isMultipleChoice 
                      ? selectedAnswers.includes(index)
                      : selectedAnswer === index;
                    
                    return (
                      <div key={index} className={`p-3 rounded-lg border ${
                        isCorrect 
                          ? 'border-green-300 bg-green-50' 
                          : isSelected 
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <span className={`font-bold ${
                            isCorrect ? 'text-green-600' : isSelected ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {index + 1}.
                          </span>
                          <span className={`${
                            isCorrect ? 'text-green-800' : isSelected ? 'text-red-800' : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                          {isCorrect && (
                            <Badge variant="success" className="ml-auto">正解</Badge>
                          )}
                          {isSelected && !isCorrect && (
                            <Badge variant="destructive" className="ml-auto">あなたの回答</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-blue-900 mb-2">解説</h3>
                  <p className="text-blue-800">{question.explanation}</p>
                </div>

                <Button onClick={nextQuestion} className="w-full">
                  {currentQuestion < questionPool.length - 1 ? '次の問題へ' : '結果を見る'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">
              {isReviewMode ? '復習モード' : '問題演習'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentQuestion + 1} / {questionPool.length}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentScreen('student-dashboard')}
              >
                終了
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-6">
            <Progress 
              value={((currentQuestion + 1) / questionPool.length) * 100} 
              className="h-2"
            />
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                {(() => {
                  const CategoryIcon = categoryConfig[question.category].icon;
                  return <CategoryIcon className="h-5 w-5" />;
                })()}
                <Badge variant="outline">{question.category}</Badge>
                <Badge variant={question.isMultipleChoice ? "default" : "secondary"}>
                  {question.isMultipleChoice ? "複数選択" : "単一選択"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {question.scenario && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">
                    <strong>シナリオ:</strong> {question.scenario}
                  </p>
                </div>
              )}

              <h2 className="text-lg font-medium text-gray-900">{question.question}</h2>

              {question.isMultipleChoice && (
                <p className="text-sm text-blue-600 font-medium">
                  ※ 複数選択可能です。当てはまるものをすべて選択してください。
                </p>
              )}

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="relative">
                    <input
                      type={question.isMultipleChoice ? "checkbox" : "radio"}
                      name="answer"
                      id={`option-${index}`}
                      checked={question.isMultipleChoice 
                        ? selectedAnswers.includes(index)
                        : selectedAnswer === index
                      }
                      onChange={(e) => {
                        if (question.isMultipleChoice) {
                          if (e.target.checked) {
                            setSelectedAnswers([...selectedAnswers, index]);
                          } else {
                            setSelectedAnswers(selectedAnswers.filter(i => i !== index));
                          }
                        } else {
                          setSelectedAnswer(index);
                        }
                      }}
                      className="sr-only"
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        (question.isMultipleChoice 
                          ? selectedAnswers.includes(index)
                          : selectedAnswer === index
                        )
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-gray-700">{index + 1}.</span>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleAnswer}
                disabled={question.isMultipleChoice 
                  ? selectedAnswers.length === 0
                  : selectedAnswer === null
                }
                className="w-full"
              >
                回答する
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default EmergencyMedicalLearningSystem;
