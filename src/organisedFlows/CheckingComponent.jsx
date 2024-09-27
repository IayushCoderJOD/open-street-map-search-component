import React from 'react'

const CheckingComponent = () => {
    return (
        <div style={{
            backgroundColor: "lightgray",
            height: "100vh",
            width: "100vw",
            fontSize: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            Migrated form <span style={{ color: "red", fontFamily: "bold" }}> CRA </span> TO <span style={{ color: "green", fontFamily: "bold" }}> VITE </span>
        </div>
    )
}

export default CheckingComponent