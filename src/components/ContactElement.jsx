const styles = {
    contactImage:{
        width: 40,
        height: 40,
    },
    contactImageContainer: {
        display: 'flex',
        alignContent: 'center',
    },
    infoUrl: {
        textDecoration: 'none',
        color: 'black',
    },

}

function ContactElement(props){
    return(
        <div style={styles.contactImageContainer}>
            <img src={props.img} style={styles.contactImage} alt={props.alt}/>
            <a href={props.url} style={styles.infoUrl}>{props.contact}</a>
        </div>
    )
}

export default ContactElement;