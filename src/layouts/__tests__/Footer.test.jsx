import { render } from '@testing-library/react';
import Footer from '../Footer';

jest.mock('@mui/icons-material/Favorite', () => () => ' FavoriteIcon ');
jest.mock('@mui/icons-material/GitHub', () => () => 'GitHubIcon');

describe('Footer', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
