class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

    commit() {
      if (this.isAllowed()) {
        this.time = new Date();
        this.account.addTransaction(this);
        return true;
      } else {
        return false;
      }

  }

  isAllowed() {
    return true;
  }
}
  
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance >= this.amount;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
console.log('Transaction 1 Success:', t1.commit());

const t2 = new Withdrawal(50.00, myAccount);
console.log('Transaction 2 Success:', t2.commit());

const t3 = new Withdrawal(200.00, myAccount);
console.log('Transaction 3 Succes:', t3.commit());

console.log('Ending Balance:', myAccount.balance);