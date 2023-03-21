import PropTypes from 'prop-types';
import css from './TransactionHistory.module.css';

export const TransactionHistory = ({ items }) => {
  return (
    <table className={css.transactionHistory}>
      <thead>
        <tr>
          <th className={css.tabTitle}>Type</th>
          <th className={css.tabTitle}>Amount</th>
          <th className={css.tabTitle}>Currency</th>
        </tr>
      </thead>
      {items.map(({ type, currency, amount, id }) => (
        <tbody  key={id}>
          <tr className={css.tabLine}>
            <td className={css.tabText}>{type}</td>
            <td className={css.tabText}>{parseInt(amount)}</td>
            <td className={css.tabText}>{currency}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

TransactionHistory.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
