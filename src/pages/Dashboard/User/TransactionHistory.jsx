import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  CreditCard,
  Clock,
  ChevronDown,
  ChevronUp,
  Receipt,
  ArrowUpDown,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedRow, setExpandedRow] = useState(null);
  const [dateRange, setDateRange] = useState("all");


  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["user-transactions"],
    queryFn: async () => {
    
      const { data } = await axiosSecure.get("/user/transactions");

      return data.map((transaction) => ({
        ...transaction,
        
        transactionId: transaction.transactionId || transaction._id,
        ticketTitle: transaction.ticketTitle || "Ticket Purchase",
        amount: transaction.amount || 0,
        paymentDate: transaction.paymentDate || transaction.createdAt,

        status:
          transaction.status === "confirmed"
            ? "completed"
            : transaction.status === "cancelled"
            ? "refunded"
            : "pending",
        paymentMethod: transaction.paymentMethod || "N/A",
      }));
    },
  });

  
  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.ticketTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((t) => t.status === filterStatus);
    }

    // Date range filter
    if (dateRange !== "all") {
      const now = new Date();
      const ranges = {
        "7days": 7,
        "30days": 30,
        "90days": 90,
      };
      const daysAgo = ranges[dateRange];
      if (daysAgo) {
        const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo));
        filtered = filtered.filter(
          (t) => new Date(t.paymentDate) >= cutoffDate
        );
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.paymentDate) - new Date(a.paymentDate);
        case "date-asc":
          return new Date(a.paymentDate) - new Date(b.paymentDate);
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, searchTerm, sortBy, filterStatus, dateRange]);

  // Calculate statistics
  
  const stats = useMemo(() => {
    const completed = filteredTransactions.filter(
      (t) => t.status === "completed"
    );
    const completedTotal = completed.reduce(
      (sum, t) => sum + (t.amount || 0),
      0
    );
    const avgTransaction =
      completed.length > 0 ? completedTotal / completed.length : 0;

    return {
      totalSpent: completedTotal, 
      totalTransactions: filteredTransactions.length,
      completedTransactions: completed.length,
      avgTransaction: avgTransaction,
    };
  }, [filteredTransactions]);

  const exportToCSV = () => {
    const headers = [
      "Transaction ID",
      "Ticket",
      "Amount",
      "Date",
      "Status",
      "Payment Method",
    ];
    const rows = filteredTransactions.map((t) => [
      t.transactionId,
      t.ticketTitle,
      t.amount,
      new Date(t.paymentDate).toLocaleString(),
      t.status,
      t.paymentMethod || "N/A",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const viewReceipt = (transaction) => {
    // Generate receipt HTML
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Receipt - ${transaction.transactionId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 40px auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .receipt {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #9333ea;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #9333ea;
              margin: 0;
              font-size: 32px;
            }
            .header p {
              color: #666;
              margin: 5px 0;
            }
            .status {
              display: inline-block;
              padding: 8px 16px;
              border-radius: 20px;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 12px;
            }
            .status.completed {
              background: #dcfce7;
              color: #16a34a;
            }
            .status.pending {
              background: #fef9c3;
              color: #ca8a04;
            }
            .status.refunded {
              background: #fee2e2;
              color: #dc2626;
            }
            .section {
              margin: 25px 0;
            }
            .section-title {
              color: #374151;
              font-weight: bold;
              margin-bottom: 10px;
              font-size: 14px;
              text-transform: uppercase;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-label {
              color: #6b7280;
            }
            .detail-value {
              font-weight: 600;
              color: #111827;
            }
            .total {
              background: #f9fafb;
              padding: 20px;
              margin-top: 30px;
              border-radius: 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .total-label {
              font-size: 18px;
              font-weight: bold;
              color: #374151;
            }
            .total-amount {
              font-size: 28px;
              font-weight: bold;
              color: #16a34a;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
              border-top: 2px solid #e5e7eb;
              padding-top: 20px;
            }
            @media print {
              body {
                background: white;
                margin: 0;
              }
              .receipt {
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>Payment Receipt</h1>
              <p>Thank you for your purchase!</p>
              <p style="margin-top: 15px;">
                <span class="status ${transaction.status}">${
      transaction.status
    }</span>
              </p>
            </div>

            <div class="section">
              <div class="section-title">Transaction Details</div>
              <div class="detail-row">
                <span class="detail-label">Transaction ID:</span>
                <span class="detail-value">${transaction.transactionId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Date:</span>
                <span class="detail-value">${new Date(
                  transaction.paymentDate
                ).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Method:</span>
                <span class="detail-value">${
                  transaction.paymentMethod || "N/A"
                }</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Purchase Details</div>
              <div class="detail-row">
                <span class="detail-label">Ticket:</span>
                <span class="detail-value">${transaction.ticketTitle}</span>
              </div>
            </div>

            <div class="total">
              <span class="total-label">Total Amount Paid:</span>
              <span class="total-amount">${transaction.amount.toFixed(2)}</span>
            </div>

            <div class="footer">
              <p><strong>Travel Booking Company</strong></p>
              <p>123 Main Street, City, State 12345</p>
              <p>Email: support@travelbooking.com | Phone: (123) 456-7890</p>
              <p style="margin-top: 15px;">This is a computer-generated receipt and does not require a signature.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Open in new window
    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();

    // Optional: Auto-print
    setTimeout(() => {
      receiptWindow.print();
    }, 250);
  };

  const downloadInvoice = (transaction) => {
   
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice - ${transaction.transactionId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
              color: #333;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              align-items: start;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 3px solid #9333ea;
            }
            .company-info h1 {
              color: #9333ea;
              margin: 0 0 10px 0;
              font-size: 36px;
            }
            .company-info p {
              margin: 5px 0;
              color: #666;
            }
            .invoice-info {
              text-align: right;
            }
            .invoice-info h2 {
              color: #9333ea;
              margin: 0 0 10px 0;
            }
            .invoice-info p {
              margin: 5px 0;
            }
            .invoice-details {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              margin-bottom: 40px;
            }
            .detail-box {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
            }
            .detail-box h3 {
              margin: 0 0 15px 0;
              color: #374151;
              font-size: 14px;
              text-transform: uppercase;
            }
            .detail-box p {
              margin: 8px 0;
              color: #6b7280;
            }
            .detail-box strong {
              color: #111827;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 30px 0;
            }
            th {
              background: #9333ea;
              color: white;
              padding: 15px;
              text-align: left;
              font-weight: 600;
            }
            td {
              padding: 15px;
              border-bottom: 1px solid #e5e7eb;
            }
            .amount-cell {
              text-align: right;
              font-weight: 600;
            }
            .totals {
              margin-top: 30px;
              text-align: right;
            }
            .totals-row {
              display: flex;
              justify-content: flex-end;
              padding: 10px 0;
            }
            .totals-label {
              width: 200px;
              text-align: right;
              padding-right: 30px;
              color: #6b7280;
            }
            .totals-value {
              width: 150px;
              text-align: right;
              font-weight: 600;
            }
            .grand-total {
              border-top: 3px solid #9333ea;
              padding-top: 15px;
              margin-top: 15px;
            }
            .grand-total .totals-label {
              font-size: 18px;
              font-weight: bold;
              color: #111827;
            }
            .grand-total .totals-value {
              font-size: 24px;
              font-weight: bold;
              color: #16a34a;
            }
            .footer {
              margin-top: 60px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            .status-badge {
              display: inline-block;
              padding: 6px 12px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
            }
            .status-completed { background: #dcfce7; color: #16a34a; }
            .status-pending { background: #fef9c3; color: #ca8a04; }
            .status-refunded { background: #fee2e2; color: #dc2626; }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div class="company-info">
              <h1>INVOICE</h1>
              <p><strong>Travel Booking Company</strong></p>
              <p>123 Main Street</p>
              <p>City, State 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: billing@travelbooking.com</p>
            </div>
            <div class="invoice-info">
              <h2>INV-${transaction.transactionId.substring(0, 8)}</h2>
              <p><strong>Invoice Date:</strong> ${new Date(
                transaction.paymentDate
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
              <p><strong>Status:</strong> <span class="status-badge status-${
                transaction.status
              }">${transaction.status}</span></p>
            </div>
          </div>

          <div class="invoice-details">
            <div class="detail-box">
              <h3>Bill To</h3>
              <p><strong>Customer Name</strong></p>
              <p>customer@email.com</p>
              <p>Customer Address</p>
            </div>
            <div class="detail-box">
              <h3>Payment Details</h3>
              <p><strong>Transaction ID:</strong></p>
              <p style="word-break: break-all; font-family: monospace; font-size: 11px;">${
                transaction.transactionId
              }</p>
              <p><strong>Payment Method:</strong> ${
                transaction.paymentMethod || "N/A"
              }</p>
              <p><strong>Payment Date:</strong> ${new Date(
                transaction.paymentDate
              ).toLocaleString()}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 60%;">Description</th>
                <th style="width: 20%;">Quantity</th>
                <th style="width: 20%;" class="amount-cell">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>${transaction.ticketTitle}</strong>
                  <br>
                  <small style="color: #6b7280;">Travel Ticket Service</small>
                </td>
                <td>1</td>
                <td class="amount-cell">${transaction.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div class="totals">
            <div class="totals-row">
              <div class="totals-label">Subtotal:</div>
              <div class="totals-value">${transaction.amount.toFixed(2)}</div>
            </div>
            <div class="totals-row">
              <div class="totals-label">Tax (0%):</div>
              <div class="totals-value">$0.00</div>
            </div>
            <div class="totals-row grand-total">
              <div class="totals-label">Total Amount:</div>
              <div class="totals-value">${transaction.amount.toFixed(2)}</div>
            </div>
          </div>

          <div class="footer">
            <p><strong>Terms & Conditions</strong></p>
            <p>Payment is due within 30 days. Please include the invoice number on your check.</p>
            <p>All tickets are non-refundable unless stated otherwise. For support, contact support@travelbooking.com</p>
            <p style="margin-top: 20px;">Thank you for your business!</p>
          </div>
        </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([invoiceHTML], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${transaction.transactionId.substring(0, 10)}-${
      new Date().toISOString().split("T")[0]
    }.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

   
    const invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Receipt className="text-purple-600" size={36} />
            Transaction History
          </h1>
          <p className="text-gray-600">
            View and manage all your payment transactions
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-green-600">
                  ${stats.totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.totalTransactions}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <CreditCard className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.completedTransactions}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Transaction</p>
                <p className="text-3xl font-bold text-orange-600">
                  ${stats.avgTransaction.toFixed(2)}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <ArrowUpDown className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Time</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              Export to CSV
            </button>
          </div>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Receipt className="text-gray-400" size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Transactions Found
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "all" || dateRange !== "all"
                ? "Try adjusting your filters"
                : "Your payment history will appear here"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Ticket Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction, index) => (
                    <React.Fragment key={transaction._id}>
                      <tr
                        className={`hover:bg-purple-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded max-w-[150px] truncate">
                            {transaction.transactionId}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {transaction.ticketTitle}
                          </div>
                          {transaction.paymentMethod && (
                            <div className="text-xs text-gray-500 mt-1">
                              {transaction.paymentMethod}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                            ${transaction.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(
                              transaction.paymentDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Clock size={12} />
                            {new Date(
                              transaction.paymentDate
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              transaction.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status?.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              setExpandedRow(
                                expandedRow === transaction._id
                                  ? null
                                  : transaction._id
                              )
                            }
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                          >
                            {expandedRow === transaction._id ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedRow === transaction._id && (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 bg-purple-50">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">
                                  Full Transaction ID:
                                </span>
                                <span className="font-mono text-gray-600">
                                  {transaction.transactionId}
                                </span>
                              </div>
                              {transaction.paymentMethod && (
                                <div className="flex justify-between">
                                  <span className="font-semibold text-gray-700">
                                    Payment Method:
                                  </span>
                                  <span className="text-gray-600">
                                    {transaction.paymentMethod}
                                  </span>
                                </div>
                              )}
                              <div className="flex justify-end gap-2 mt-4">
                                <button
                                  onClick={() => viewReceipt(transaction)}
                                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                  View Receipt
                                </button>
                                <button
                                  onClick={() => downloadInvoice(transaction)}
                                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                                >
                                  Download Invoice
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 p-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {transaction.ticketTitle}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono truncate">
                        {transaction.transactionId.substring(0, 20)}...
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        ${transaction.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(transaction.paymentDate).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === transaction._id
                            ? null
                            : transaction._id
                        )
                      }
                      className="text-purple-600 hover:text-purple-800"
                    >
                      {expandedRow === transaction._id ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </button>
                  </div>

                  {expandedRow === transaction._id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">
                          {transaction.paymentMethod}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => viewReceipt(transaction)}
                          className="flex-1 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm"
                        >
                          Receipt
                        </button>
                        <button
                          onClick={() => downloadInvoice(transaction)}
                          className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm"
                        >
                          Invoice
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Footer */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <span className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-bold text-gray-800">
                      {filteredTransactions.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-gray-800">
                      {transactions.length}
                    </span>{" "}
                    transactions
                  </span>
                </div>
                <div className="text-center md:text-right">
                  <span className="text-sm text-gray-600">
                    Total:{" "}
                    <span className="font-bold text-green-600 text-lg">
                      ${stats.totalSpent.toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
