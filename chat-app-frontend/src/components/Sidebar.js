import React, { useContext, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { AppContext } from '../context/appContext'

function Sidebar() {
    const { socket, rooms, setRooms, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, personalMessage, setPersonalMessage, newMessage, setNewMessage } = useContext(AppContext)
    socket.off('new-user').on('new-user', (payload) => {
        console.log(payload);
        setMembers(payload)
    })

    function getRooms() {
        fetch('http://localhost:5001/rooms').then((res) => res.json()).then((data) => setRooms(data))
    }
    useEffect(()=>{
        if(user){
            setCurrentRoom("general")
            getRooms()
            socket.emit("join-room","general")
            socket.emit("new-user")
        }
    },[])

    const user = useSelector((state) => state.user)
    if (!user) {
        return <></>
    }


    return (
        <>
            <h2>Availabe groups</h2>
            <ListGroup>
                {rooms.map((room, idx) => {
                    return <ListGroup.Item key={idx}> {room} </ListGroup.Item>
                })}

            </ListGroup>
            <h2>Members</h2>
            <ListGroup>
                {members.map((member) => {
                    return <ListGroup.Item key={member.id} style={{ cursor: 'pointer' }}> {member.name} </ListGroup.Item>
                })}

            </ListGroup>

        </>
    )

}

export default Sidebar