import { Form, useNavigate } from '@remix-run/react';
import { Search } from 'lucide-react';
import React from 'react';

const SearchPosts: React.FC = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigate = useNavigate();

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/dashboard/posts?search=${searchQuery}`);
    }

    return (
        <Form onSubmit={handleSubmit} className="w-fit h-fit px-3 py-3 flex flex-row items-center border bg-inherit border-gray-600 gap-3 rounded-full">
            <Search color='gray' />
            <input value={searchQuery} onChange={handleQueryChange} type="text" placeholder="Search posts" className="bg-inherit focus:outline-none w-full h-full text-white" />
        </Form>
    );
};

export default SearchPosts;