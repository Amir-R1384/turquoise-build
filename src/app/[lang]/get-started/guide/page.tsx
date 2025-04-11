'use client'

import { requestFormAtom } from '@/atoms'
import CustomCheckbox from '@/components/CustomCheckbox'
import getTranslation from '@/translations'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'

export default function Guide() {
	const params = useParams()
	const lang = params.lang as string

	console.log(params)

	const dict = getTranslation(lang)
	const [requestForm, setRequestForm] = useAtom(requestFormAtom)

	const { region, area, startDate, endDate } = requestForm
	const { bedroom, bathroom, kitchen, livingRoom, diningRoom, garden } = requestForm.options

	return (
		<>
			<div className="flex flex-col gap-y-2 mb-10">
				<label htmlFor="region">{dict.labels.region}</label>
				<input
					id="region"
					type="text"
					value={region}
					onChange={e => setRequestForm(prev => ({ ...prev, region: e.target.value }))}
					placeholder="Montreal - Laval - Longueuil"
					className="input"
					required
				/>
			</div>
			<div className="flex flex-col gap-y-2 mb-10">
				<label htmlFor="area">{dict.labels.area}</label>
				<input
					id="area"
					type="text"
					value={area}
					onChange={e => setRequestForm(prev => ({ ...prev, area: e.target.value }))}
					placeholder="120 square meters - 60 square feet"
					className="input"
					required
				/>
			</div>
			<div className="flex flex-col gap-y-2 mb-10">
				<div className="text-lg mb-1">{dict.labels.rooms}</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-main">
					<CustomCheckbox
						name={dict.labels.bedroom}
						checked={bedroom.num > 0}
						withSelect={true}
						selectValue={bedroom.num.toString()}
						onClick={() =>
							setRequestForm(prev => ({
								...prev,
								options: {
									...prev.options,
									bedroom: { num: prev.options.bedroom.num > 0 ? 0 : 1 }
								}
							}))
						}
						onSelectClick={e => {
							setRequestForm(prev => ({
								...prev,
								options: {
									...prev.options,
									bedroom: { num: Number(e.target.value) }
								}
							}))
						}}
					/>
					<CustomCheckbox
						name={dict.labels.bathroom}
						checked={bathroom.num > 0}
						withSelect={true}
						selectValue={bathroom.num.toString()}
						onClick={() =>
							setRequestForm(prev => ({
								...prev,
								options: {
									...prev.options,
									bathroom: { num: prev.options.bathroom.num > 0 ? 0 : 1 }
								}
							}))
						}
						onSelectClick={e => {
							setRequestForm(prev => ({
								...prev,
								options: {
									...prev.options,
									bathroom: { num: Number(e.target.value) }
								}
							}))
						}}
					/>
					<CustomCheckbox
						name={dict.labels.kitchen}
						checked={kitchen}
						onClick={() =>
							setRequestForm(prev => ({
								...prev,
								options: {
									...prev.options,
									kitchen: !prev.options.kitchen
								}
							}))
						}
					/>
					<CustomCheckbox
						name={dict.labels.livingRoom}
						checked={livingRoom}
						onClick={() =>
							setRequestForm(prev => ({
								...prev,
								options: {
									...prev.options,
									livingRoom: !prev.options.livingRoom
								}
							}))
						}
					/>
					<CustomCheckbox
						name={dict.labels.diningRoom}
						checked={diningRoom}
						onClick={() =>
							setRequestForm(prev => ({
								...prev,
								options: {
									...prev.options,
									diningRoom: !prev.options.diningRoom
								}
							}))
						}
					/>
					<CustomCheckbox
						name={dict.labels.garden}
						checked={garden}
						onClick={() =>
							setRequestForm(prev => ({
								...prev,
								options: {
									...prev.options,
									garden: !prev.options.garden
								}
							}))
						}
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-main">
				<div className="flex flex-col gap-y-2 mb-10">
					<label htmlFor="startDate">{dict.labels.startAt}</label>
					<input
						type="date"
						id="startDate"
						value={startDate}
						onChange={e =>
							setRequestForm(prev => ({ ...prev, startDate: e.target.value }))
						}
					/>
				</div>
				<div className="flex flex-col gap-y-2 mb-10">
					<label htmlFor="endDate">{dict.labels.endBy}</label>
					<input
						type="date"
						id="endDate"
						value={endDate}
						onChange={e =>
							setRequestForm(prev => ({ ...prev, endDate: e.target.value }))
						}
					/>
				</div>
			</div>
		</>
	)
}
