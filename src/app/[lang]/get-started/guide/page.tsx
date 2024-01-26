'use client'

import { requestFormAtom } from '@/atoms'
import CustomCheckbox from '@/components/CustomCheckbox'
import { useRecoilState } from 'recoil'

export default function Guide() {
	const [requestForm, setRequestForm] = useRecoilState(requestFormAtom)

	const { region, area, startDate, endDate } = requestForm
	const { bedroom, bathroom, kitchen, livingRoom, diningRoom, garden } = requestForm.options

	return (
		<>
			<div className="flex flex-col gap-y-2 mb-10">
				<label htmlFor="region">Region</label>
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
				<label htmlFor="area">Area estimation</label>
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
				<div className="text-lg mb-1">Rooms to renovate</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-main">
					<CustomCheckbox
						name="Bedroom"
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
						name="Bathroom"
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
						name="Kitchen"
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
						name="Living Room"
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
						name="Garden"
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
					<label htmlFor="startDate">Start at</label>
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
					<label htmlFor="endDate">End by</label>
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
