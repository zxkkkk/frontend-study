import { defineStore } from 'pinia';
import { PersistenceOptions } from 'pinia-plugin-persistedstate'; // 导入 PersistenceOptions

interface AccountState {
  transactions: {
    id: number;
    description: string;
    amount: number;
    type: 'income' | 'expense';
  }[];
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;
}

export const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    transactions: [],
    totalIncome: 0,
    totalExpense: 0,
    currentBalance: 0,
  }),
  actions: {
    addTransaction(description: string, amount: number, type: 'income' | 'expense') {
      const transaction: AccountState['transactions'][number] = {
        id: Date.now(),
        description,
        amount,
        type,   
      };
      this.transactions.push(transaction);
      this.recalculateTotals();
    },
    deleteTransaction(id: number) {
      this.transactions = this.transactions.filter((t) => t.id !== id);
      this.recalculateTotals();
    },
    recalculateTotals() {
      const totalIncome = this.transactions.reduce((acc, t) => {
        return t.type === 'income' ? acc + t.amount : acc;
      }, 0);
      const totalExpense = this.transactions.reduce((acc, t) => {
        return t.type === 'expense' ? acc + t.amount : acc;
      }, 0);
      this.totalIncome = totalIncome;
      this.totalExpense = totalExpense;
      this.currentBalance = totalIncome - totalExpense;
    },
  },
  persist: {
    key: 'my-account-store', 
    storage: localStorage, 
  } as PersistenceOptions, 
});
