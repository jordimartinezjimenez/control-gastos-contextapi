import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    const handleResetApp = () => {
        const res = confirm("¿Estas seguro de reiniciar el presupuesto y los gastos")
        if (res) {
            dispatch({ type: 'reset-app' })
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#db2777' : '#818cf8',
                        trailColor: '#f5f5f5',
                        textSize: '10',
                        textColor: percentage === 100 ? '#db2777' : '#818cf8',
                    })}
                    text={`${percentage}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button type="button" className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg" onClick={() => handleResetApp()}>
                    Resetear
                </button>
                <div className="flex flex-col gap-2">
                    <AmountDisplay
                        label="Presupuesto"
                        amount={state.budget}
                    />
                    <AmountDisplay
                        label="Disponible"
                        amount={remainingBudget}
                    />
                    <AmountDisplay
                        label="Gastado"
                        amount={totalExpenses}
                    />
                </div>
            </div>
        </div>
    )
}
