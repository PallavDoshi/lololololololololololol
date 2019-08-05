function register(event)
{ 
    document.getElementById('fname').style.border = 'none';
    document.getElementById('sname').style.border = 'none';
    document.getElementById('address').style.border = 'none';
    document.getElementById('password').style.border = 'none';
    document.getElementById('email').style.border = 'none';

    var flag = 0;
    let email = document.getElementById('email').value;
    let fname = document.getElementById('fname').value; 
    let sname = document.getElementById('sname').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;
    let gender = document.querySelector('input[name="gender"]:checked');
    if(gender!=null)
        gender=document.querySelector('input[name="gender"]:checked').value;

    let image = sessionStorage.getItem('tempimgdata');
    

    if(flag==0)
        flag=exists(email,flag);  
        
    if(flag==0)
        flag=isnull(image,email,fname,sname,address,password,gender,flag);

    if(flag==0)
        flag=emailvalidation(email,flag);

    if(flag==0)
        flag=validation(fname,sname,password,flag);

    if(flag===0)
        store(image,email,fname,sname,address,password,gender);
}

function changeProfilePicture()
{
    var Image =document.getElementById("image").files[0];
    

    var reader = new FileReader();
    reader.readAsDataURL(Image);
        
    reader.onload = function () 
    {
        var imgdata = reader.result;
        sessionStorage.setItem("tempimgdata",imgdata);
        document.getElementById("dispimage").src=sessionStorage.tempimgdata;
    };

    reader.onerror = function (error) 
    {};

}


function exists(email,flag)
{
    var codeArray = JSON.parse(localStorage.getItem('users')) || [];

    for(i=0;i<codeArray.length;i++)
    {
        if(email===codeArray[i].email)
        {
            alert('The email already exists!');
            flag++;
            break;
        }
    }

    return flag;
}


function isnull(image,email,fname,sname,address,password,gender,flag)
{
    //flag = 0;

    if(email==='')
    {
        document.getElementById('email').placeholder = 'Please enter an Email';
        document.getElementById('email').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    if(fname==='')
    {
        document.getElementById('fname').placeholder = 'Please enter your first name';
        document.getElementById('fname').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }
    
    if(sname==='')
    {
        document.getElementById('sname').placeholder = 'Please enter your last name';
        document.getElementById('sname').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }

    if(address==='')
    {
        document.getElementById('address').placeholder = 'Please enter your address';
        document.getElementById('address').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }
    
    if(password==='')
    {
        document.getElementById('password').placeholder = 'Please enter your password';
        document.getElementById('password').style.border = 'solid 2px rgba(244, 81, 30)';

        flag++;
    }
    
    if(image==null)
    {
        alert('image cannot be blank');
        flag++;
    }

    if(gender==null)
    {
        alert('Please select a gender');
        flag++;
    }
    
    return flag;
}

function emailvalidation(email,flag)
{
    let emailre = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(emailre.test(email)==false)
    {
        alert('Please enter a valid email');
        flag++;
    }

    return flag;
}

function validation(fname,sname,password,flag)
{
    let passwordre = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let namere = /^[A-Za-z]+$/;

    if(passwordre.test(password)==false)
    {
        alert('Please enter a valid password');
        flag++;
    }

    if(namere.test(fname)===false)
    {
        alert('Please enter a valid first name');
        flag++;
    }

    if(namere.test(sname)==false)
    {
        alert('Please enter a valid last name');
        flag++;
    }

    return flag;
}


function store(image,email,fname,sname,address,password,gender)
{
    let codeObject =
    {   
        /* id: new Date().getTime(), */
        email,
        fname,
        sname,
        address,
        password,
        gender,
        image
    }

    let codeArray = JSON.parse(localStorage.getItem('users')) || [];
    codeArray.push(codeObject);
    localStorage.setItem('users',JSON.stringify(codeArray));

    location.assign('login.html');
}

function update()
{
    var ivalue = sessionStorage.getItem('ivalue');
    var flag = 0;
    
    let email = document.getElementById('email').value; 
    let fname = document.getElementById('fname').value; 
    let sname = document.getElementById('sname').value;
    let address = document.getElementById('address').value;
    let password = document.getElementById('password').value;
    let image = document.getElementById('image');
    let gender = document.querySelector('input[name="gender"]:checked');
    if(gender!=null)
        gender=document.querySelector('input[name="gender"]:checked').value;

    if(flag==0)
        flag=isnull(email,fname,sname,address,password,gender,flag);

    if(flag==0)
        flag=validation(fname,sname,password,flag);

    if(flag==0)
    {
        let codeObject =
        {   
            email,
            fname,
            sname,
            address,
            password,
            gender
        }
        let codeArray = JSON.parse(localStorage.getItem('users')) || [];
        codeArray[ivalue]=codeObject;
        localStorage.setItem('users',JSON.stringify(codeArray));

        document.getElementById('fname').disabled = true;
        document.getElementById('sname').disabled = true;
        document.getElementById('male').disabled = true;
        document.getElementById('female').disabled = true;
        document.getElementById('address').disabled = true;
        document.getElementById('password').disabled = true;

        document.getElementById('save').style.display='none';
    }
}