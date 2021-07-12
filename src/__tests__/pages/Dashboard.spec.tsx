import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';

jest.mock('react-router-dom', () => {
    return {
        Link: ({ children }: { children: React.ReactNode }) => children,
    }
})

describe('Dashboard Page', () => {
    it('should be able rendered the page in the terminal', () => {
        const { debug } = render(<Dashboard />);

        debug();
    })

    it('should be able find the text in the page', () => {
        render(<Dashboard />)

        expect(screen.getByText('Explore repositórios no Github')).toBeInTheDocument();
    })

    it('should be able to find the placeholder of the input field', async () => {
        render(<Dashboard />);

        const repoInput = screen.getByPlaceholderText('Digite o nome do repositório');

        expect(repoInput).toBeInTheDocument();

    })

    it('should be able to search a repository', async () => {
        render(<Dashboard />);

        const repoInput = screen.getByPlaceholderText('Digite o nome do repositório');
        const searchRepoButton = screen.getByTestId('add-repo-button');
        const value = 'facebook/react'

        fireEvent.change(repoInput, {
            target: {
                value: value,
            }
        });
        fireEvent.click(searchRepoButton);


        const searchFirstRepoTitle = await screen.findByText('facebook/react');

        expect(searchFirstRepoTitle).toBeInTheDocument();
        expect(searchFirstRepoTitle).toHaveTextContent('facebook/react');
    })

    it('should be able to search a repository when it creates more than one', async () => {
        render(<Dashboard />);

        const repositoriesInput = screen.getByPlaceholderText('Digite o nome do repositório');
        const searchRepoButton = screen.getByTestId('add-repo-button');

        fireEvent.change(repositoriesInput, {
            target: {
                value: 'RaquelAlbuquerque1/animais-fantasticos'
            }
        });
        fireEvent.click(searchRepoButton);

        fireEvent.change(repositoriesInput, {
            target: {
                value: 'vuejs/vue'
            }
        });
        fireEvent.click(searchRepoButton);

        const addedFirstRepositoryTitle = await screen.findByText('RaquelAlbuquerque1/animais-fantasticos');
        const addedSecondRepositoryTitle = await screen.findByText('vuejs/vue');

        expect(addedFirstRepositoryTitle).toHaveTextContent('RaquelAlbuquerque1/animais-fantasticos');
        expect(addedSecondRepositoryTitle).toHaveTextContent('vuejs/vue');
    })
})


