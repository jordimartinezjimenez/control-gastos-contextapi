import { ChangeEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-3xl text-indigo-400 font-medium text-center">Definir presupuesto</label>
                <input
                    type="number"
                    className="w-full bg-slate-100 border border-gray-200 p-2 text-center"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    id=" budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className="bg-indigo-400 hover:bg-indigo-500 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40 transition disabled:cursor-not-allowed"
                value="Añadir"
                disabled={isValid}
            />
        </form>
    )
}