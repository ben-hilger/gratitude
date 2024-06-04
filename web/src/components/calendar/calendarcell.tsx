interface CalendarCellProps {
    date: Date
    disabled: boolean
    selected: boolean
    onClick: (date: Date) => void
}

export default function CalendarCell(props: CalendarCellProps) {

    function formatDate() {
        return Intl.DateTimeFormat(
           undefined, {
                day: 'numeric'
            }
        ).format(props.date);
    }

    function selectDate() {
        if (props.disabled) {
            return;
        }
        props.onClick(props.date)
    }

    return (
      <div onClick={selectDate}
          className={`cursor-pointer lg:py-5 lg:m-0.5 rounded-xl md:p-4 flex items-center justify-center border border-black 
                        ${props.disabled ? "bg-gray-400" : ""}
                        ${props.selected ? "bg-blue-500" : ""}
                        `}>
           {formatDate()}
      </div>
    );
}