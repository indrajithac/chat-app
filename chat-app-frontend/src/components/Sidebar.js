import React, { useContext, useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../context/appContext'
import { addNotifications, resetNotifications } from '../features/userSlice'
import './Sidebar.css'

function Sidebar() {
    const { socket, rooms, setRooms, currentRoom, setCurrentRoom, members, setMembers, personalMessage, setPersonalMessage } = useContext(AppContext)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    console.log(user);


    socket.off('new-user').on('new-user', (payload) => {
        console.log(payload);
        setMembers(payload)
    })

    function getRooms() {
        fetch('http://localhost:5001/rooms').then((res) => res.json()).then((data) => setRooms(data))
    }
    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert("Login to continue")
        }
        socket.emit("join-room", room)
        console.log(room);
        setCurrentRoom(room)

        if (!isPublic) {
            setPersonalMessage(null)
        }

        dispatch(resetNotifications(room))

    }
    socket.off('notifications').on('notifications', (room) => {
        if (currentRoom !== room) {
            dispatch(addNotifications(room))
        }
    })

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + '-' + id2
        } else {
            return id2 + '-' + id1
        }
    }

    function handlePersonalMessage(member) {
        setPersonalMessage(member)
        const roomId = orderIds(user._id, member._id)
        joinRoom(roomId, false)
    }

    useEffect(() => {
        if (user) {
            setCurrentRoom("general")
            getRooms()
            socket.emit("join-room", "general")
            socket.emit("new-user")
        }
    }, [])

    if (!user) {
        return <></>
    }


    return (
        <>
            <h2>Availabe groups</h2>
            <ListGroup>
                {rooms.map((room, idx) => {
                    return <ListGroup.Item key={idx} onClick={() => joinRoom(room)} active={room === currentRoom} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                        {room} {currentRoom !== room && <span className='badge rounded-pill bg-primary'>{user.newMessages[room]}</span>}
                    </ListGroup.Item>
                })}

            </ListGroup>
            <h2>Members</h2>
            <ListGroup>
                {members.map((member) => {
                    return <ListGroup.Item key={member.id} style={{ cursor: 'pointer' }} active={personalMessage?._id === member?._id} onClick={() => handlePersonalMessage(member)} disabled={member._id === user._id}>
                        <Row>
                            <Col xs={2} className="member-status">
                                <img src={member.url} alt='' className="member-status-img" />
                                {member.status === "online" ? <i className='fas fa-circle sidebar-online-status'></i> : <i className='fas fa-circle sidebar-offline-status'></i>}
                            </Col>
                            <Col xs={9}>
                                {member.name}
                                {member._id === user?._id && " (You)"}
                            </Col>
                            <Col xs={1}>
                                <span className="badge rounded-pill bg-primary"></span>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                })}

            </ListGroup>

        </>
    )

}

export default Sidebar