'use client'

import { requestFormAtom } from '@/atoms'
import { useAtom } from 'jotai'

export default function Describe() {
	const [requestForm, setRequestForm] = useAtom(requestFormAtom)

	return (
		<textarea
			value={requestForm.description}
			onChange={e => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
			className="border border-black w-full min-h-[100px] mt-2 p-1"
		/>
	)
}
