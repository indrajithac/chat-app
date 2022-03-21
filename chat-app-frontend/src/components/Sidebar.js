import React from 'react'
import { ListGroup } from 'react-bootstrap'

function Sidebar() {
    const rooms = ["Room 1", "Room 2", "Room 3"]
    return (
        <>
            <h2>Availabe groups</h2>
            <ListGroup>
                {rooms.map((room, idx) => {
                    return <ListGroup.Item key={idx}> {room} </ListGroup.Item>
                })}

            </ListGroup>   
            <h2>Members</h2>
                     
        </>
    )

}

export default Sidebar