"use client"

import { useState } from "react"
import { Users, MessageCircle, CheckSquare, DollarSign, Plus, Send, Check, Clock, AlertCircle, X } from "lucide-react"

// Mock data for demonstration
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  room: "Room A",
  isAdmin: true,
}

const mockRoomMembers = [
  { id: 1, name: "John Doe", email: "john@example.com", isAdmin: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", isAdmin: false },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", isAdmin: false },
]

const mockMessages = [
  {
    id: 1,
    sender: "Jane Smith",
    message: "Hey everyone! Don't forget about the house meeting tonight.",
    timestamp: "2:30 PM",
  },
  { id: 2, sender: "Mike Johnson", message: "I'll be a bit late, but I'll be there!", timestamp: "2:45 PM" },
  { id: 3, sender: "John Doe", message: "No problem Mike. We'll start around 7 PM.", timestamp: "3:00 PM" },
]

const mockTasks = [
  { id: 1, title: "Clean Kitchen", assignedTo: "Jane Smith", status: "pending", dueDate: "2024-01-15" },
  { id: 2, title: "Take Out Trash", assignedTo: "Mike Johnson", status: "in-progress", dueDate: "2024-01-14" },
  { id: 3, title: "Vacuum Living Room", assignedTo: "John Doe", status: "done", dueDate: "2024-01-13" },
  { id: 4, title: "Buy Groceries", assignedTo: "Jane Smith", status: "pending", dueDate: "2024-01-16" },
]

const mockExpenses = [
  {
    id: 1,
    description: "Groceries",
    amount: 120.5,
    paidBy: "John Doe",
    date: "2024-01-10",
    splitAmong: ["John Doe", "Jane Smith", "Mike Johnson"],
  },
  {
    id: 2,
    description: "Electricity Bill",
    amount: 85.0,
    paidBy: "Jane Smith",
    date: "2024-01-08",
    splitAmong: ["John Doe", "Jane Smith", "Mike Johnson"],
  },
  {
    id: 3,
    description: "Internet Bill",
    amount: 60.0,
    paidBy: "Mike Johnson",
    date: "2024-01-05",
    splitAmong: ["John Doe", "Jane Smith", "Mike Johnson"],
  },
]

// ---------- Modal Component ----------
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState("chat")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Login / Signup form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" })
  const [isSignup, setIsSignup] = useState(false)

  // Chat states
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  // Tasks
  const [newTask, setNewTask] = useState({ title: "", assignedTo: "", dueDate: "" })
  const [showTaskForm, setShowTaskForm] = useState(false)

  // Expenses
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", paidBy: "" })
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  // ----------- Authentication Handlers ----------
  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleSignup = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  // ----------- Chat Handler ----------
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: mockUser.name,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  // ----------- Task Handler ----------
  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTask.title && newTask.assignedTo && newTask.dueDate) {
      // mock save
      setNewTask({ title: "", assignedTo: "", dueDate: "" })
      setShowTaskForm(false)
    }
  }

  // ----------- Expense Handler ----------
  const handleAddExpense = (e) => {
    e.preventDefault()
    if (newExpense.description && newExpense.amount && newExpense.paidBy) {
      // mock save
      setNewExpense({ description: "", amount: "", paidBy: "" })
      setShowExpenseForm(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <Check className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateOwedAmount = () => {
    const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const perPersonShare = totalExpenses / mockRoomMembers.length
    return perPersonShare.toFixed(2)
  }

  // ----------- Authentication Screen ----------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">RoomMate Hub</h1>
            <p className="text-gray-600">{isSignup ? "Create your account" : "Manage your shared living space"}</p>
          </div>

          {!isSignup ? (
            // Sign In
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </button>
            </form>
          ) : (
            // Sign Up
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsSignup(false)} className="text-indigo-600 cursor-pointer hover:underline">
                  Sign In
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span onClick={() => setIsSignup(true)} className="text-indigo-600 cursor-pointer hover:underline">
                  Sign Up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    )
  }

  // ----------- Main App (after login) ----------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RoomMate Hub</h1>
                <p className="text-sm text-gray-500">{mockUser.room}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {mockUser.name}</span>
              <button onClick={() => setIsLoggedIn(false)} className="text-sm text-gray-500 hover:text-gray-700">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "chat", label: "Chatterbox", icon: MessageCircle },
              { id: "tasks", label: "Tasks", icon: CheckSquare },
              { id: "expenses", label: "Expenses", icon: DollarSign },
              { id: "members", label: "Members", icon: Users },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chat */}
        {activeTab === "chat" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Room Chat</h2>
              <p className="text-sm text-gray-600">Stay connected with your roommates</p>
            </div>
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex space-x-3">
                  <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-6 border-t">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Task Management</h2>
                <p className="text-sm text-gray-600">Assign and track household chores</p>
              </div>
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>

            {showTaskForm && (
              <Modal title="Create New Task" onClose={() => setShowTaskForm(false)}>
                <form onSubmit={handleAddTask} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter task title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                    <select
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select member</option>
                      {mockRoomMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Task
                  </button>
                </form>
              </Modal>
            )}

            <div className="bg-white rounded-lg shadow divide-y">
              {mockTasks.map((task) => (
                <div key={task.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        Assigned to {task.assignedTo} • Due {task.dueDate}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>{task.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expenses */}
        {activeTab === "expenses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Expense Tracking</h2>
                <p className="text-sm text-gray-600">Split household expenses fairly</p>
              </div>
              <button
                onClick={() => setShowExpenseForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Expense</span>
              </button>
            </div>

            {showExpenseForm && (
              <Modal title="Add New Expense" onClose={() => setShowExpenseForm(false)}>
                <form onSubmit={handleAddExpense} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Groceries, Electricity Bill"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paid By</label>
                    <select
                      value={newExpense.paidBy}
                      onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select member</option>
                      {mockRoomMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Expense
                  </button>
                </form>
              </Modal>
            )}

            <div className="bg-white rounded-lg shadow divide-y">
              {mockExpenses.map((expense) => (
                <div key={expense.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      Paid by {expense.paidBy} • {expense.date}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <p className="font-medium text-gray-900">Per Person Share</p>
                <p className="font-medium text-indigo-600">${calculateOwedAmount()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Members */}
        {activeTab === "members" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Room Members</h2>
              <p className="text-sm text-gray-600">Manage your roommates</p>
            </div>
            <div className="divide-y">
              {mockRoomMembers.map((member) => (
                <div key={member.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      member.isAdmin ? "bg-indigo-100 text-indigo-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {member.isAdmin ? "Admin" : "Member"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
