"use client"

import { useState } from "react"
import {
  Users,
  MessageCircle,
  CheckSquare,
  DollarSign,
  Plus,
  Send,
  Check,
  Clock,
  AlertCircle,
  Building2,
  Settings,
  UserPlus,
  X,
} from "lucide-react"

const mockUsers = {
  admin: {
    id: 1,
    name: "Sarah Johnson",
    email: "admin@hostelhub.com",
    role: "admin",
    hostelName: "Sunrise Hostel",
  },
  member: {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "member",
    roomId: "room-a",
    roomName: "Room A",
  },
}

const mockRooms = [
  { id: "room-a", name: "Room A", capacity: 4, occupied: 3, currentOccupancy: 3 },
  { id: "room-b", name: "Room B", capacity: 6, occupied: 5, currentOccupancy: 5 },
  { id: "room-c", name: "Room C", capacity: 2, occupied: 1, currentOccupancy: 1 },
]

const mockRoomMembers = [
  { id: 1, name: "John Doe", email: "john@example.com", roomId: "room-a" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", roomId: "room-a" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", roomId: "room-a" },
  { id: 1, name: "Emily Davis", email: "emily@example.com", roomId: "room-b" },
  { id: 2, name: " Davis", email: "emily@example.com", roomId: "room-b" },
  { id: 3, name: "mily", email: "emily@example.com", roomId: "room-b" },

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

export default function HostelHub() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [loginForm, setLoginForm] = useState({ email: "", password: "", userType: "member" })
  const [showSignUp, setShowSignUp] = useState(false)
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "member",
    hostelName: "",
  })
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [newTask, setNewTask] = useState({ title: "", assignedTo: "", dueDate: "", priority: "medium" })
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", paidBy: "", category: "general" })
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
  const [showEditRoomForm, setShowEditRoomForm] = useState(false)
  const [showRoomDetailsModal, setShowRoomDetailsModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [newRoom, setNewRoom] = useState({ name: "", capacity: "", description: "" })
  const [editRoom, setEditRoom] = useState({ id: "", name: "", capacity: "", description: "" })

  const [showAddMemberForm, setShowAddMemberForm] = useState(false)
  const [showMoveMemberForm, setShowMoveMemberForm] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [newMember, setNewMember] = useState({ name: "", email: "", roomId: "" })
  const [moveMember, setMoveMember] = useState({ memberId: "", newRoomId: "" })
  const [memberSearchTerm, setMemberSearchTerm] = useState("")

  const [taskFilter, setTaskFilter] = useState("all")
  const [tasks, setTasks] = useState(mockTasks)
  const [expenses, setExpenses] = useState(mockExpenses)
  const [priorityFilter, setPriorityFilter] = useState("all")

  const getCurrentUserRoom = () => {
    if (!currentUser) return null
    if (currentUser.role === "admin") return null // Admin sees all rooms
    return mockRoomMembers.find((member) => member.email === currentUser.email)?.roomId
  }

  const getRoomMembers = () => {
    if (!currentUser) return []

    if (currentUser.role === "admin") {
      // Admin sees all members for management
      return mockRoomMembers
    } else {
      // Regular members only see their room members
      const userRoom = getCurrentUserRoom()
      return mockRoomMembers.filter((member) => member.roomId === userRoom)
    }
  }

  const filteredMembers = getRoomMembers().filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearchTerm.toLowerCase()),
  )

  const handleLogin = (e) => {
    e.preventDefault()

    // Mock authentication logic
    if (loginForm.userType === "admin" && loginForm.email === "admin@hostelhub.com") {
      setCurrentUser(mockUsers.admin)
      setIsLoggedIn(true)
      setActiveTab("dashboard")
    } else if (loginForm.userType === "member" && loginForm.email === "john@example.com") {
      setCurrentUser(mockUsers.member)
      setIsLoggedIn(true)
      setActiveTab("chat")
    } else {
      alert("Invalid credentials")
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    // Mock sign up - in real app, this would create user account
    const newUser = {
      id: Date.now(),
      name: signUpForm.name,
      email: signUpForm.email,
      role: signUpForm.userType,
      ...(signUpForm.userType === "admin" ? { hostelName: signUpForm.hostelName } : {}),
    }
    setCurrentUser(newUser)
    setIsLoggedIn(true)
    setShowSignUp(false)
    setActiveTab(signUpForm.userType === "admin" ? "dashboard" : "chat")
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: currentUser.name,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTask.title && newTask.assignedTo && newTask.dueDate) {
      const task = {
        id: tasks.length + 1,
        title: newTask.title,
        assignedTo: newTask.assignedTo,
        status: "pending",
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        createdBy: currentUser.name,
        createdAt: new Date().toISOString(),
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", assignedTo: "", dueDate: "", priority: "medium" })
      setShowTaskForm(false)
    }
  }

  const handleAddExpense = (e) => {
    e.preventDefault()
    if (newExpense.description && newExpense.amount && newExpense.paidBy) {
      const expense = {
        id: expenses.length + 1,
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
        paidBy: newExpense.paidBy,
        category: newExpense.category,
        date: new Date().toISOString().split("T")[0],
        splitAmong: mockRoomMembers.map((member) => member.name),
        addedBy: currentUser.name,
      }
      setExpenses([...expenses, expense])
      setNewExpense({ description: "", amount: "", paidBy: "", category: "general" })
      setShowExpenseForm(false)
    }
  }

  const handleCompleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: "done", completedAt: new Date().toISOString(), completedBy: currentUser.name }
          : task,
      ),
    )
  }

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date().toISOString() } : task,
      ),
    )
  }

  const handleCreateRoom = (e) => {
    e.preventDefault()
    if (newRoom.name && newRoom.capacity) {
      // In real app, this would save to backend
      console.log("Creating room:", newRoom)
      setNewRoom({ name: "", capacity: "", description: "" })
      setShowCreateRoomForm(false)
    }
  }

  const handleEditRoom = (e) => {
    e.preventDefault()
    if (editRoom.name && editRoom.capacity) {
      // In real app, this would update backend
      console.log("Editing room:", editRoom)
      setEditRoom({ id: "", name: "", capacity: "", description: "" })
      setShowEditRoomForm(false)
    }
  }

  const handleDeleteRoom = (roomId) => {
    if (confirm("Are you sure you want to delete this room? This action cannot be undone.")) {
      // In real app, this would delete from backend
      console.log("Deleting room:", roomId)
    }
  }

  const handleAddMember = (e) => {
    e.preventDefault()
    if (newMember.name && newMember.email && newMember.roomId) {
      // In real app, this would save to backend
      console.log("Adding member:", newMember)
      setNewMember({ name: "", email: "", roomId: "" })
      setShowAddMemberForm(false)
    }
  }

  const handleMoveMember = (e) => {
    e.preventDefault()
    if (moveMember.memberId && moveMember.newRoomId) {
      // In real app, this would update backend
      console.log("Moving member:", moveMember)
      setMoveMember({ memberId: "", newRoomId: "" })
      setShowMoveMemberForm(false)
    }
  }

  const handleRemoveMember = (memberId, memberName) => {
    if (confirm(`Are you sure you want to remove ${memberName} from the hostel? This action cannot be undone.`)) {
      // In real app, this would delete from backend
      console.log("Removing member:", memberId)
    }
  }

  const openMoveMember = (member) => {
    setMoveMember({ memberId: member.id, newRoomId: member.roomId })
    setSelectedMember(member)
    setShowMoveMemberForm(true)
  }

  const openEditRoom = (room) => {
    setEditRoom({
      id: room.id,
      name: room.name,
      capacity: room.capacity.toString(),
      description: room.description || "",
    })
    setShowEditRoomForm(true)
  }

  const openRoomDetails = (room) => {
    setSelectedRoom(room)
    setShowRoomDetailsModal(true)
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

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "all") return true
    if (taskFilter === "my-tasks") return task.assignedTo === currentUser?.name
    if (taskFilter === "pending") return task.status === "pending"
    if (taskFilter === "in-progress") return task.status === "in-progress"
    if (taskFilter === "completed") return task.status === "done"
    return true
  })

  const calculateOwedAmount = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const perPersonShare = totalExpenses / mockRoomMembers.length
    return perPersonShare.toFixed(2)
  }

  const calculatePersonalBalance = () => {
    const totalPaid = expenses
      .filter((expense) => expense.paidBy === currentUser?.name)
      .reduce((sum, expense) => sum + expense.amount, 0)
    const totalOwed = Number.parseFloat(calculateOwedAmount()) * expenses.length
    return (totalPaid - totalOwed).toFixed(2)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFilteredTasks = () => {
    let filtered = tasks

    if (taskFilter !== "all") {
      filtered = filtered.filter((task) => task.status === taskFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter)
    }

    return filtered
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "groceries":
        return "bg-red-200"
      case "utilities":
        return "bg-blue-200"
      case "cleaning":
        return "bg-green-200"
      case "maintenance":
        return "bg-yellow-200"
      default:
        return "bg-gray-200"
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Hostel Hub</h1>
            <p className="text-gray-600">Manage your hostel and shared living spaces</p>
          </div>

          {!showSignUp ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLoginForm({ ...loginForm, userType: "admin" })}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      loginForm.userType === "admin"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1" />
                    Hostel Owner
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginForm({ ...loginForm, userType: "member" })}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      loginForm.userType === "member"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1" />
                    Room Member
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={loginForm.userType === "admin" ? "admin@hostelhub.com" : "john@example.com"}
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
                Sign In as {loginForm.userType === "admin" ? "Hostel Owner" : "Room Member"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSignUpForm({ ...signUpForm, userType: "admin" })}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      signUpForm.userType === "admin"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1" />
                    Create Hostel
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignUpForm({ ...signUpForm, userType: "member" })}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      signUpForm.userType === "member"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1" />
                    Join Room
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={signUpForm.name}
                  onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {signUpForm.userType === "admin" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hostel Name</label>
                  <input
                    type="text"
                    value={signUpForm.hostelName}
                    onChange={(e) => setSignUpForm({ ...signUpForm, hostelName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your hostel name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={signUpForm.email}
                  onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                {signUpForm.userType === "admin" ? "Create Hostel Account" : "Create Member Account"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            {!showSignUp ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setShowSignUp(true)} className="text-indigo-600 hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setShowSignUp(false)} className="text-indigo-600 hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hostel Hub</h1>
                <p className="text-sm text-gray-500">
                  {currentUser?.role === "admin" ? currentUser.hostelName : currentUser?.roomName || "Room Member"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-sm text-gray-700">{currentUser?.name}</span>
                <p className="text-xs text-gray-500 capitalize">
                  {currentUser?.role === "admin" ? "Hostel Owner" : "Room Member"}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false)
                  setCurrentUser(null)
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {currentUser?.role === "admin"
              ? // Admin navigation
                [
                  { id: "dashboard", label: "Dashboard", icon: Building2 },
                  { id: "rooms", label: "Rooms", icon: Users },
                  { id: "members", label: "Members", icon: UserPlus },
                  { id: "settings", label: "Settings", icon: Settings },
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
                })
              : // Member navigation
                [
                  { id: "chat", label: "Chat", icon: MessageCircle },
                  { id: "tasks", label: "Tasks", icon: CheckSquare },
                  { id: "expenses", label: "Expenses", icon: DollarSign },
                  { id: "members", label: "Room Members", icon: Users },
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
        {currentUser?.role === "admin" && activeTab === "dashboard" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name}</h2>
              <p className="text-gray-600">Here's what's happening at {currentUser.hostelName}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                    <p className="text-2xl font-bold text-gray-900">{mockRooms.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold text-gray-900">{mockRoomMembers.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <CheckSquare className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(
                        (mockRooms.reduce((sum, room) => sum + room.occupied, 0) /
                          mockRooms.reduce((sum, room) => sum + room.capacity, 0)) *
                          100,
                      )}
                      %
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$2,450</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <UserPlus className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">New member John Doe joined Room A</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Task "Clean Kitchen" completed in Room B</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">New expense added in Room C</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Settings/Profile Tab */}
        {currentUser?.role === "admin" && activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Admin Profile & Settings</h2>
              <p className="text-gray-600">Manage your hostel and personal information</p>
            </div>

            {/* Admin Profile Card */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{currentUser.name}</h4>
                    <p className="text-gray-600">{currentUser.email}</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-2">
                      Hostel Owner
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={currentUser.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hostel Name</label>
                    <input
                      type="text"
                      value={currentUser.hostelName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                    <input
                      type="text"
                      value="January 2024"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Hostel Statistics */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Hostel Overview</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{mockRooms.length}</p>
                    <p className="text-sm text-gray-600">Total Rooms</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{mockRoomMembers.length}</p>
                    <p className="text-sm text-gray-600">Active Members</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-8 h-8 text-yellow-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">$2,450</p>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Plus className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Create New Room</p>
                      <p className="text-sm text-gray-600">Add a new room to your hostel</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <UserPlus className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Add Member</p>
                      <p className="text-sm text-gray-600">Invite new members to rooms</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Rooms Management Tab */}
        {currentUser?.role === "admin" && activeTab === "rooms" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
                <p className="text-gray-600">Manage all rooms in your hostel</p>
              </div>
              <button
                onClick={() => setShowCreateRoomForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Room</span>
              </button>
            </div>

            {showCreateRoomForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setShowCreateRoomForm(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Room</h3>
                  <form onSubmit={handleCreateRoom} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                      <input
                        type="text"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="e.g., Room A, Deluxe Suite"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (Number of Beds)</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="4"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                      <textarea
                        value={newRoom.description}
                        onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Room features, amenities, etc."
                        rows="3"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Create Room
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateRoomForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showEditRoomForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setShowEditRoomForm(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Room</h3>
                  <form onSubmit={handleEditRoom} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Name</label>
                      <input
                        type="text"
                        value={editRoom.name}
                        onChange={(e) => setEditRoom({ ...editRoom, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (Number of Beds)</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={editRoom.capacity}
                        onChange={(e) => setEditRoom({ ...editRoom, capacity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={editRoom.description}
                        onChange={(e) => setEditRoom({ ...editRoom, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows="3"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEditRoomForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showRoomDetailsModal && selectedRoom && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
                  <button
                    onClick={() => setShowRoomDetailsModal(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedRoom.name} Details</h3>

                  <div className="space-y-6">
                    {/* Room Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Capacity</p>
                        <p className="text-xl font-bold text-gray-900">{selectedRoom.capacity} beds</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Occupied</p>
                        <p className="text-xl font-bold text-gray-900">{selectedRoom.occupied} members</p>
                      </div>
                    </div>

                    {/* Current Members */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Current Members</h4>
                      <div className="space-y-2">
                        {mockRoomMembers
                          .filter((member) => member.roomId === selectedRoom.id)
                          .map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-indigo-600">
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{member.name}</p>
                                  <p className="text-sm text-gray-600">{member.email}</p>
                                </div>
                              </div>
                              <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4 border-t">
                      <button
                        onClick={() => openEditRoom(selectedRoom)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Edit Room
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Add Member
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(selectedRoom.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete Room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          room.occupied === room.capacity
                            ? "bg-red-100 text-red-800"
                            : room.occupied > room.capacity * 0.8
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {room.occupied === room.capacity ? "Full" : "Available"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">{room.capacity} beds</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Occupied:</span>
                        <span className="font-medium">{room.occupied} members</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Occupancy Rate:</span>
                        <span className="font-medium">{Math.round((room.occupied / room.capacity) * 100)}%</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex space-x-2">
                      <button
                        onClick={() => openEditRoom(room)}
                        className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openRoomDetails(room)}
                        className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Members Management Tab */}
        {currentUser?.role === "admin" && activeTab === "members" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Member Management</h2>
                <p className="text-gray-600">Manage all members across your hostel</p>
              </div>
              <button
                onClick={() => setShowAddMemberForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search members by name or email..."
                    value={memberSearchTerm}
                    onChange={(e) => setMemberSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {filteredMembers.length} of {mockRoomMembers.length} members
                </div>
              </div>
            </div>

            {showAddMemberForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setShowAddMemberForm(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Member</h3>
                  <form onSubmit={handleAddMember} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter member's full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter member's email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Room</label>
                      <select
                        value={newMember.roomId}
                        onChange={(e) => setNewMember({ ...newMember, roomId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a room</option>
                        {mockRooms.map((room) => (
                          <option key={room.id} value={room.id} disabled={room.occupied >= room.capacity}>
                            {room.name} ({room.occupied}/{room.capacity} beds)
                            {room.occupied >= room.capacity ? " - Full" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Add Member
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddMemberForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showMoveMemberForm && selectedMember && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setShowMoveMemberForm(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Move Member to Different Room</h3>
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{selectedMember.name}</p>
                    <p className="text-sm text-gray-600">{selectedMember.email}</p>
                    <p className="text-xs text-gray-500">
                      Currently in: {mockRooms.find((r) => r.id === selectedMember.roomId)?.name}
                    </p>
                  </div>
                  <form onSubmit={handleMoveMember} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Move to Room</label>
                      <select
                        value={moveMember.newRoomId}
                        onChange={(e) => setMoveMember({ ...moveMember, newRoomId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select new room</option>
                        {mockRooms.map((room) => (
                          <option
                            key={room.id}
                            value={room.id}
                            disabled={room.id === selectedMember.roomId || room.occupied >= room.capacity}
                          >
                            {room.name} ({room.occupied}/{room.capacity} beds)
                            {room.id === selectedMember.roomId
                              ? " - Current Room"
                              : room.occupied >= room.capacity
                                ? " - Full"
                                : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Move Member
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowMoveMemberForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-indigo-600">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-xs text-gray-500">
                            Room: {mockRooms.find((r) => r.id === member.roomId)?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openMoveMember(member)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Move Room
                        </button>
                        <button
                          onClick={() => handleRemoveMember(member.id, member.name)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredMembers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      {memberSearchTerm ? "No members found matching your search." : "No members found."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chatterbox Tab */}
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
                      {message.sender === currentUser?.name && <span className="text-xs text-indigo-600">You</span>}
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

        {/* Member User Interface (Non-Admin) */}
        {currentUser?.role === "member" && activeTab === "chat" && (
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

        {/* Member Tasks Tab */}
        {currentUser?.role === "member" && activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
                <p className="text-gray-600">Manage your room tasks</p>
              </div>
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Task Form Modal */}
            {showTaskForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setShowTaskForm(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h3>
                  <form onSubmit={handleAddTask} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter task title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                      <select
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select member</option>
                        {getRoomMembers().map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Add Task
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowTaskForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Task Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-4">
                <select
                  value={taskFilter}
                  onChange={(e) => setTaskFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Completed</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="space-y-4">
                  {getFilteredTasks().map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(task.status)}
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
                          <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace("-", " ")}
                        </span>
                        {task.assignedTo === currentUser?.name && task.status !== "done" && (
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {getFilteredTasks().length === 0 && (
                    <div className="text-center py-8 text-gray-500">No tasks found matching your filters.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Member Expenses Tab */}
        {currentUser?.role === "member" && activeTab === "expenses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Expenses</h2>
                <p className="text-gray-600">Track and split room expenses</p>
              </div>
              <button
                onClick={() => setShowExpenseForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Expense</span>
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${mockExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Your Share</p>
                    <p className="text-2xl font-bold text-gray-900">
                      $
                      {(
                        mockExpenses.reduce((sum, expense) => sum + expense.amount, 0) / getRoomMembers().length
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Balance</p>
                    <p className="text-2xl font-bold text-gray-900">$0.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Expense Form */}
            {showExpenseForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setShowExpenseForm(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Expense</h3>
                  <form onSubmit={handleAddExpense} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        type="text"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter expense description"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="groceries">Groceries</option>
                        <option value="utilities">Utilities</option>
                        <option value="cleaning">Cleaning Supplies</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Paid By</label>
                      <select
                        value={newExpense.paidBy}
                        onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select member</option>
                        {getRoomMembers().map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Add Expense
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowExpenseForm(false)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Expenses List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Expenses</h3>
                <div className="space-y-4">
                  {mockExpenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(expense.category)}`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{expense.description}</h4>
                          <p className="text-sm text-gray-600">Paid by: {expense.paidBy}</p>
                          <p className="text-xs text-gray-500">{expense.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${expense.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Split {getRoomMembers().length} ways</p>
                        <p className="text-xs text-gray-500">
                          Your share: ${(expense.amount / getRoomMembers().length).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Member Members Tab */}
        {currentUser?.role === "member" && activeTab === "members" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Room Members</h2>
                <p className="text-gray-600">Your roommates</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="space-y-4">
                  {getRoomMembers().map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-indigo-600">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-xs text-gray-500">
                            Room: {mockRooms.find((r) => r.id === member.roomId)?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {getRoomMembers().length === 0 && (
                    <div className="text-center py-8 text-gray-500">No members found in your room.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/*  Removed duplicate Room Members section that was causing the double display */}

        {/* Move Member Modal */}
        {showMoveMemberForm && selectedMember && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center bg-gray-100 p-4 border-b rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-900">Move Member</h3>
                <button onClick={() => setShowMoveMemberForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p>
                  Are you sure you want to move <span className="font-semibold">{selectedMember.name}</span>?
                </p>
                <form onSubmit={handleMoveMember} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Select New Room</label>
                    <select
                      value={moveMember.newRoomId}
                      onChange={(e) => setMoveMember({ ...moveMember, newRoomId: e.target.value })}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a room</option>
                      {mockRooms.map((room) => (
                        <option key={room.id} value={room.id} disabled={room.currentOccupancy >= room.capacity}>
                          {room.name} ({room.currentOccupancy}/{room.capacity})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowMoveMemberForm(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Move Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
