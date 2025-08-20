import Image from 'next/image'
import type { ChangeEvent } from 'react'

interface Params {
	name: string
	checked: boolean
	onClick: (e: ChangeEvent<HTMLInputElement>) => void
	withSelect?: boolean
	selectValue?: string
	onSelectClick?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export default function CustomCheckbox({
	name,
	withSelect = false,
	checked,
	onClick,
	selectValue,
	onSelectClick
}: Params) {
	return (
		<div className="flex gap-x-3 items-center">
			<label
				htmlFor={'checkBox ' + name}
				className="flex gap-x-2 items-center cursor-pointer">
				<input
					onChange={onClick}
					type="checkbox"
					id={'checkBox ' + name}
					checked={checked}
					className="appearance-none"
				/>
				<div
					className={`${
						checked && 'bg-stone-500'
					} w-4 h-4 border border-stone-500`}></div>
				<div className="text-xl">{name}</div>
			</label>
			{checked && withSelect ? (
				<div className="relative flex items-center cursor-pointer">
					<label htmlFor={'select-' + name} className="sr-only">
						{name} select
					</label>
					<select
						value={selectValue}
						onChange={onSelectClick}
						id={'select-' + name}
						className="pr-6 text-lg mr-2 bg-transparent text-center outline-none appearance-none cursor-pointer"
						aria-label={name + ' select'}>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
					</select>

					<Image
						alt="drop down"
						src="/assets/icons/carretDown.svg"
						width={25}
						height={25}
						className="absolute right-0 p-1 bg-white pointer-events-none"
					/>
				</div>
			) : (
				''
			)}
		</div>
	)
}
