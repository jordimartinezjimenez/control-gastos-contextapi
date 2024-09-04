import { ChangeEvent } from "react";
import { categories } from "../data/category";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: { id: e.target.value } })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5 ">
                    <label htmlFor="category" className="text-gray-600 text-2xl font-bold">Filtrar Gastos</label>
                    <select
                        name="category"
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded text-center"
                        onChange={handleChange}
                    >
                        <option value="">-- Todos --</option>
                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                                className="even:bg-white odd:bg-slate-100"
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
