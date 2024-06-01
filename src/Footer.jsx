function footer(){
    const date=new Date();
    var day=date.getDate();
    var month=date.getMonth()+1;
    var year=date.getFullYear();
    return(
        <footer>
            <hr></hr>
          <p className="">&copy;{day}/{month}/{year}</p>
       </footer>
    ) 
}

export default footer;