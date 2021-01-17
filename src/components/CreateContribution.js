const contributionForm = () => (
    <form>
        <div className="form-group">
            <input name="title" onChange={handleChange} type="text" value={title} placeholder="Title" />
        </div>
        <div className="form-group">
            <textarea name="description" onChange={handleChange} type="text" value={description} placeholder="description" />
        </div>
        <div className="form-group">
            <input name="link" onChange={handleChange} type="text" value={link} placeholder="link" />
        </div>
        <div className="form-group">
            <input name="contact" onChange={handleChange} type="text" value={contact} placeholder="contact" />
        </div>
        <div>
            <button className="btn btn-primary" onClick={handleSubmit}> Create</button>
        </div>
    </form>
)

const { title, description, link, contact } = values;
    
const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value})
}

const handleSubmit = (event) => {
    event.preventDefault();
    // validate
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/something`,
        headers: {
            Authorizatoin: `Bearer ${token}`
        },
        data: { title, description, link, contact },
    })
    .then( response => {
        console.log('ADD_CONTRIBUTOR_SUCCESS', response)
    })
    .catch(error => {
        console.log('ADD_CONTRIBUTOR_ERROR', error)
    })
}

