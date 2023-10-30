const styles={
    titleContainer:{
        backgroundColor:'#f0ff00',
        width: 400,
        height: 60
    },
    header:{
        fontSize: 30,
    },
    blank:{
        height: 40,
    }
}
function CVContent(props){
    return (
        <div>
            <div style={styles.titleContainer}>
                <span style = {styles.header}>{props.title}</span>
            </div>
            <div>
{/*                {*/}
{/*`                    if(props.title === "Repository"){*/}
{/*                         return <div>https://github.com/egogit?tab=repositories</div>*/}
{/*                     }else{*/}

{/*                     }`*/}
{/*                }*/}
            </div>
            <div style ={styles.blank}></div>
        </div>
    )
}

export default CVContent;