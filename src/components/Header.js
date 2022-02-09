import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd, showAdd, onRefresh, onDequeue }) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showAdd? 'red':'green'} text={showAdd? 'Close' : 'Add'} onClick={onAdd} />
            <Button text='Refresh' color='black' onClick={onRefresh}/>
            <Button text='Pop' color='grey' onClick={onDequeue} />
        </header>
    );
};

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;
