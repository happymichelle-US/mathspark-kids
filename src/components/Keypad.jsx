export default function Keypad({ value, onChange, onSubmit }) {
  const press = (k) => {
    if (k === 'DEL') { onChange(value.slice(0, -1)); return }
    if (k === 'OK') { onSubmit(); return }
    if (value.length < 6) onChange(value + k)
  }

  const keys = ['7','8','9','4','5','6','1','2','3','DEL','0','OK']

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white border-4 border-indigo-300 rounded-2xl px-6 py-3 text-3xl font-bold text-indigo-800 min-w-[120px] text-center min-h-[56px]">
        {value || <span className="text-gray-300">?</span>}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {keys.map(k => (
          <button
            key={k}
            onClick={() => press(k)}
            aria-label={k}
            className={`
              w-14 h-14 rounded-xl text-lg font-bold transition-transform active:scale-95
              ${k === 'OK'
                ? 'bg-green-500 text-white hover:bg-green-600'
                : k === 'DEL'
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}
            `}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  )
}
