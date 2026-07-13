export const Header  = (props) => {
    const {title, subtitle, left, right, classNameLeft, classNameRight} = props
    return(
        <div className="flex flex-col w-full">
            <div className={classNameLeft}>
                <div className="flex flex-col">
                    <h1 className="text-4xl">{title}</h1>
                    <p className="text-lg text-gray-500">{subtitle}</p>
                </div>

                {left}
            </div>

            <div className={classNameRight}>
                {right}
            </div>
        </div>
    )
}