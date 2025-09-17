import { createProject } from '@/api/projects';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  const handleSubmit = async (formData: FormData) => {
    'use server';

    console.log(formData);

    const rawFormData = {
      name: formData.get('name') as string,
      desc: formData.get('desc') as string,
    };

    try {
      const response = await createProject(rawFormData);

      if (!response.ok) throw new Error(`Failed to create project: ${response.statusText}`);
      console.log('Project created successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      New Project
      <form action={handleSubmit}>
        <Input type='text' name='name' placeholder='Project Name' />
        <Input type='text' name='desc' placeholder='Project Description' />
        <Button type='submit'>Create Project</Button>
      </form>
    </div>
  );
}
