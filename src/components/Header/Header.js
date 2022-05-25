import React from "react"

const TableHeaderComponent = ({ headerSet, styleClass }) => (
    <thead className={styleClass}>
        <tr>
            <th>Player Name</th>
            {headerSet.map((set, idx) => {
                return (
                    <th key={idx}>{set}</th>
                )
            })}
            <th>Current Set</th>
            <th></th>
        </tr>
    </thead>
)

export const TableHeader = React.memo(TableHeaderComponent)