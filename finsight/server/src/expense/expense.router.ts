import express from 'express';
import { body, validationResult } from 'express-validator';
import * as ExpenseService from './expense.service';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

export const expenseRouter = express.Router();

expenseRouter.use(authMiddleware);

// GET: /api/expenses - Get all expenses for the logged-in user
expenseRouter.get('/', async (req: AuthRequest, res) => {
  try {
    const expenses = await ExpenseService.getExpensesByUser(req.userId!);
    return res.status(200).json(expenses);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST: /api/expenses - Create a new expense
expenseRouter.post('/',
  [
    body('description').isString().notEmpty(),
    body('amount').isFloat({ gt: 0 }),
    body('date').isISO8601().toDate(),
  ],
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const expense = req.body;
      const newExpense = await ExpenseService.createExpense(expense, req.userId!);
      return res.status(201).json(newExpense);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// PUT: /api/expenses/:id - Update an expense
expenseRouter.put('/:id',
  [
    body('description').isString().notEmpty(),
    body('amount').isFloat({ gt: 0 }),
    body('category').isString().notEmpty(),
    body('date').isISO8601().toDate(),
  ],
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id = req.params.id;
      const expense = req.body;
      const result = await ExpenseService.updateExpense(expense, id, req.userId!);
      
      if (result.count === 0) {
        return res.status(404).json({ error: "Expense not found or user not authorized." });
      }

      return res.status(200).json({ message: "Expense updated successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// DELETE: /api/expenses/:id - Delete an expense
expenseRouter.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const id = req.params.id;
    const result = await ExpenseService.deleteExpense(id, req.userId!);

    if (result.count === 0) {
      return res.status(404).json({ error: "Expense not found or user not authorized." });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
