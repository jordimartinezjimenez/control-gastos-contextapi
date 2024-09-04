import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        <p className="text-2xl text-indigo-400 font-bold">
            {label && `${label}: `}
            <span className="text-zinc-600">{formatCurrency(amount)}</span>
        </p>
    )
}
