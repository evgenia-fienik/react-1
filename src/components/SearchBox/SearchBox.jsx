export default function SearchBox({filter, onChange}) {
    return (
        <>
            <p>Find contacts by name</p>
            <input type='text' value={filter} onChange={onChange} placeholder='...'></input>
        </>
    )
}