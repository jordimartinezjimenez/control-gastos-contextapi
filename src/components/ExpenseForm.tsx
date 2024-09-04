import { ChangeEvent, useEffect, useState } from "react"
import type { DraftExpense, Value } from "../types"
import { categories } from "../data/category"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const { dispatch, state } = useBudget()

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({ ...expense, [name]: isAmountField ? +value : value })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validation
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        // Add or edit expense
        if (state.editingId) {
            dispatch({ type: 'edit-expense', payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        // Reset form
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-2xl font-black text-center border-b-4 border-blue-500">{state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="textl-xl">Nombre Gasto:</label>
                <input type="text" name="expenseName" id="expenseName" placeholder="Añade el nombre del gasto" value={expense.expenseName} onChange={handleChange} className="bg-slate-100 p-2" />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="textl-xl">Cantidad:</label>
                <input type="number" name="amount" id="amount" placeholder="Añade la cantidad del gasto: ej. 300" value={expense.amount} onChange={handleChange} className="bg-slate-100 p-2" />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="textl-xl">Cantidad:</label>
                <select name="category" id="category" value={expense.category} onChange={handleChange} className="bg-slate-100 p-2">
                    <option value="">-- Seleccionar --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="textl-xl">Fecha Gasto:</label>
                <DatePicker name="date" id="date" value={expense.date} onChange={handleChangeDate} className="bg-slate-100 p-2 border-0" />
            </div>

            <input type="submit" value={state.editingId ? 'Guardar Cambios' : 'Añadir Gasto'} className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bbold uppercase rounded-lg transition" />
        </form>
    )
}
