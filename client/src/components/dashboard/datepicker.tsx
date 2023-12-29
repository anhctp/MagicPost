
export default function DatePicker() {
    const style = {
        input: "bg-yellow-200 border border-stone-600 rounded-lg focus:ring-green-500 focus:border-green-500 block w-full px-2",
    }
    return (
        <div>

            <div date-rangepicker className="flex items-center justify-start">
                <span className="mx-4">Thống kê từ</span>
                <div className="relative">
                    <input name="start" type="date" className={style.input}/>
                </div>
                <span className="mx-4">đến</span>
                <div className="relative">
                    <input name="end" type="date" className={style.input}/>
                </div>
            </div>

        </div>
    )
}