import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, TrendingUp, TrendingDown, Plus, Search, FileText, Calendar } from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
  studentName?: string;
  status: "completed" | "pending" | "failed";
}

interface FeeRecord {
  id: string;
  studentName: string;
  class: string;
  admissionNo: string;
  monthlyFee: number;
  paidAmount: number;
  dueAmount: number;
  lastPayment: string;
  status: "paid" | "partial" | "overdue";
}

export default function Account() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      category: "Fee Payment",
      description: "Monthly fee - Sarah Johnson",
      amount: 1500,
      date: "2024-01-15",
      studentName: "Sarah Johnson",
      status: "completed"
    },
    {
      id: "2",
      type: "expense",
      category: "Salary",
      description: "Teacher salary payment",
      amount: 45000,
      date: "2024-01-10",
      status: "completed"
    },
    {
      id: "3",
      type: "income",
      category: "Fee Payment",
      description: "Admission fee - Michael Chen",
      amount: 5000,
      date: "2024-01-12",
      studentName: "Michael Chen",
      status: "completed"
    }
  ];

  const feeRecords: FeeRecord[] = [
    {
      id: "1",
      studentName: "Sarah Johnson",
      class: "10-A",
      admissionNo: "244",
      monthlyFee: 1500,
      paidAmount: 1500,
      dueAmount: 0,
      lastPayment: "2024-01-15",
      status: "paid"
    },
    {
      id: "2",
      studentName: "Michael Chen",
      class: "9-B",
      admissionNo: "251",
      monthlyFee: 1500,
      paidAmount: 1000,
      dueAmount: 500,
      lastPayment: "2024-01-10",
      status: "partial"
    },
    {
      id: "3",
      studentName: "Emily Davis",
      class: "8-A",
      admissionNo: "261",
      monthlyFee: 1500,
      paidAmount: 0,
      dueAmount: 3000,
      lastPayment: "2023-11-15",
      status: "overdue"
    }
  ];

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const pendingFees = feeRecords.reduce((sum, record) => sum + record.dueAmount, 0);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Management</h1>
          <p className="text-muted-foreground">Track fees, expenses, and financial reports</p>
        </div>
        <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fee">Fee Payment</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Input placeholder="Transaction description" />
              </div>
              <div>
                <Label>Amount</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddTransactionOpen(false)}>Add Transaction</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Fees</p>
                <p className="text-2xl font-bold text-orange-600">${pendingFees.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Balance</p>
                <p className="text-2xl font-bold text-primary">${(totalIncome - totalExpenses).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="fees">Fee Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </p>
                        <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Collection Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Students with pending fees:</span>
                    <span className="font-medium">{feeRecords.filter(r => r.status !== "paid").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total pending amount:</span>
                    <span className="font-medium text-orange-600">${pendingFees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collection rate:</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Transactions</CardTitle>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}>
                        {transaction.type === "income" ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </p>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Fee Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Student</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Monthly Fee</th>
                      <th className="text-left p-3 font-medium">Paid Amount</th>
                      <th className="text-left p-3 font-medium">Due Amount</th>
                      <th className="text-left p-3 font-medium">Last Payment</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeRecords.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{record.studentName}</p>
                            <p className="text-sm text-muted-foreground">#{record.admissionNo}</p>
                          </div>
                        </td>
                        <td className="p-3">{record.class}</td>
                        <td className="p-3">${record.monthlyFee}</td>
                        <td className="p-3">${record.paidAmount}</td>
                        <td className="p-3">
                          <span className={record.dueAmount > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                            ${record.dueAmount}
                          </span>
                        </td>
                        <td className="p-3">{record.lastPayment}</td>
                        <td className="p-3">
                          <Badge variant={
                            record.status === "paid" ? "default" : 
                            record.status === "partial" ? "secondary" : "destructive"
                          }>
                            {record.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}