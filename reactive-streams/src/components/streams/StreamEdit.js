import React from 'react'

export default function StreamEdit(props) {
    const {id} = props.match.params;
    return (
        <div>
            StreamEdit {id}
        </div>
    )
}
