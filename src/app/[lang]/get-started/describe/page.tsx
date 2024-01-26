'use client'

import { requestFormAtom } from '@/atoms'
import { useRecoilState } from 'recoil'

export default function Describe() {
	const [requestForm, setRequestForm] = useRecoilState(requestFormAtom)

	return (
		<textarea
			value={requestForm.description}
			onChange={e => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
			className="border border-black w-full min-h-[100px] mt-2 p-1"
		/>
	)
}
