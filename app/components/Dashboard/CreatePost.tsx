import React, { useState } from "react";
import { Form } from "@remix-run/react";
import { Organization } from "~/models/organizations";

const CreatePost: React.FC<{
  organizations: Array<Organization> | [];
}> = ({ organizations }) => {
  const [file, setFile] = useState<File | null>(null);
  const [publicPost, setPublicPost] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="w-full max-w-md p-5 rounded-xl flex flex-col items-center gap-4 bg-neutral-950 border border-neutral-900 ease-in-out duration-150 hover:border-primary"
    >
      <h1 className="text-2xl font-bold text-white">Create Post</h1>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full placeholder:text-md text-white bg-neutral-800 p-3 border hover:border-primary ease-in-out duration-150 border-neutral-800 focus:outline-none focus:border-gray-300 rounded-md"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full placeholder:text-md text-white bg-neutral-800 p-3 border hover:border-primary ease-in-out duration-150 border-neutral-800 focus:outline-none focus:border-gray-300 rounded-md"
      />

      <label
        htmlFor="file"
        className="cursor-pointer mt-5 py-3 w-full duration-150 ease-in-out border-primary border text-xl font-semibold hover:bg-primary hover:text-black p-2 rounded-full bg-black text-primary text-center"
      >
        Choose File
        <input type="file" name="file" id="file" className="hidden" onChange={(e) => setFile(e.target.files![0])} />
      </label>
      {file && (
        <div className="bg-primary py-2 bg-opacity-50 text-[#ff00fb] border-[#ff00fb] flex justify-center rounded-full border-2 w-56 h-fit overflow-y-auto overflow-x-hidden">
          <p className="font-extralight">{file.name}</p>
        </div>
      )}

      <label htmlFor="public" className="flex items-center text-gray-500">
        <input
          type="checkbox"
          name="public"
          id="check"
          checked={publicPost}
          onChange={() => setPublicPost(!publicPost)}
          className="mr-2 custom-checkbox"
        />
        Public
      </label>

      {!publicPost && (
        <label htmlFor="org" className="flex flex-col items-center text-gray-500">
          <span className="mb-1">Organization</span>
          {organizations.length === 0 ? (
            <p>No organizations found</p>
          ) : (
            <select
              name="org"
              className="form-select bg-neutral-900 border-gray-700 rounded-md text-white focus:ring-primary focus:border-primary"
            >
              {organizations.map((org, index) => (
                <option key={index} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          )}
        </label>
      )}

      <button
        type="submit"
        className="cursor-pointer mt-5 w-full duration-150 ease-in-out text-xl font-semibold hover:bg-primary hover:text-black p-2 rounded-full bg-inherit text-primary text-center"
      >
        Upload
      </button>
    </Form>
  );
};

export default CreatePost;