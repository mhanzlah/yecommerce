import { Link } from 'react-router-dom'

const Breadcrumbs = ({ items = [] }) => {
    if (!items.length) return null;

    return (
        <nav className='flex items-center text-sm pb-2'>
            {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                    <div className='flex items-center uppercase'>
                        {isLast ? (<p>{item.name}</p>) : (
                            <Link to={item.to} className='text-gray-400 hover:text-black'>{item.name}</Link>
                        )}

                        {!isLast && (
                            <span className='px-2 text-gray-400'>/</span>
                        )}
                    </div>
                );
            })}
        </nav>
    )
}

export default Breadcrumbs