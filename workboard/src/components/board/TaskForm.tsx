import React, { useEffect } from 'react';
import { Form, Input, Select, Space } from 'antd';
import { Button } from '../ui/Button';
import type { Task } from '../../types/board';

interface TaskFormProps {
  initialValues?: Partial<Task>;
  onSubmit: (values: Omit<Task, 'id' | 'updatedAt' | 'assignee'>) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  onFieldsChange?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  onFieldsChange,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        tags: initialValues.tags || [],
        assigneeName: initialValues.assignee?.name || '',
        assigneeAvatar: initialValues.assignee?.avatarUrl || '',
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    const submissionData: any = {
      title: values.title,
      description: values.description || '',
      status: values.status || 'backlog',
      priority: values.priority || 'medium',
      tags: values.tags || [],
    };
    
    if (values.assigneeName) {
      submissionData.assignee = {
        name: values.assigneeName,
        avatarUrl: values.assigneeAvatar || undefined,
      };
    } else {
      submissionData.assignee = undefined;
    }

    onSubmit(submissionData);
    if (!initialValues) {
      // If it was a create operation, we reset the form after successful submit
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ status: 'backlog', priority: 'medium', tags: [] }}
      className="mt-4"
      onFieldsChange={onFieldsChange}
    >
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: 'Please enter a task title' }]}
      >
        <Input autoFocus placeholder="E.g., Design new landing page" />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select options={[
            { label: 'Backlog', value: 'backlog' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Done', value: 'done' },
          ]} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select a priority' }]}
        >
          <Select options={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]} />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="assigneeName"
          label="Assignee Name"
        >
          <Input placeholder="E.g., Jane Doe" />
        </Form.Item>

        <Form.Item
          name="assigneeAvatar"
          label="Avatar URL (Optional)"
        >
          <Input placeholder="https://..." />
        </Form.Item>
      </div>

      <Form.Item
        name="tags"
        label="Tags"
      >
        <Select mode="tags" placeholder="Add tags (press enter)" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea rows={4} placeholder="Optional detailed description..." />
      </Form.Item>

      <Form.Item className="mb-0 text-right">
        <Space>
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="primary" onClick={form.submit} disabled={isSubmitting}>
            {initialValues ? 'Save Changes' : 'Create Task'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
