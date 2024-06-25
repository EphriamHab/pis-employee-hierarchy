"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPosition, updatePosition } from '../redux/positionSlice';
import { Position } from "../../types";
import * as yup from "yup";
import { describe } from "node:test";
import { yupResolver } from "@hookform/resolvers/yup";
import { on } from "node:events";

const schema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  parentId: yup.number().nullable(),
});

interface PositionFromProps {
  position?: Position;
  onClose: () => void;
}

const PosttionForm = ({ position, onClose }: PositionFromProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Position>({
    resolver: yupResolver(schema),
    defaultValues: position || { id:0,name: "", description: "", parentId: null },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: Position) => {
    if (position) {
      dispatch(updatePosition({ ...position, ...data }));
    } else {
      dispatch(addPosition(data));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <label>ID</label>
      <input id="id" {...register('id')} />
       {errors.id && <p>{errors.id.message}</p>}
      </div>
      <div>
        <label>Name</label>
        <input {...register("name")} />
         { errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Description</label>
        <input {...register("description")} />
        { errors.description && <p>{errors.description.message}</p>}
      </div>
      <div>
        <label>Parent Id</label>
        <input type="number" {...register('parentId')} />
        { errors.parentId && <p>{errors.parentId?.message}</p>}
      </div>
      <button type="submit">{position ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default PosttionForm;