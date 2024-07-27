import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";


function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditingSession = Boolean(editId);

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({ defaultValues: isEditingSession ? editValues : {} });
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditingSession) {
      editCabin({ newCabin: { ...data, image }, id: editId }, {
        onSuccess: () => {
          reset();
          onCloseModal();
        }
      });
    }
    else {
      createCabin({ ...data, image }, {
        onSuccess: () => {
          reset();
          onCloseModal();
        }
      });
    }
  }

  const isWorking = isEditing || isCreating;

  return (
    <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit)}>
      <FormRow id="name" label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "This field is required", })} disabled={isWorking} />
      </FormRow>

      <FormRow id="maxCapacity" label="Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          },
        })} disabled={isWorking} />
      </FormRow>

      <FormRow id="regularPrice" label="Price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", { required: "This field is required", })} disabled={isWorking} />
      </FormRow >

      <FormRow id="discount" label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => (Number(value) <= Number(getValues("regularPrice"))) || "Discount should be less than Price"
        })
        } disabled={isWorking} />
      </FormRow >

      <FormRow id="description" label="Description" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description", { required: "This field is required", })} />
      </FormRow >

      <FormRow id="image" label="Cabin Image" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image", { required: isEditingSession ? false : "This field is required", })} disabled={isWorking} />
      </FormRow >

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>{isEditingSession ? "Edit Cabin" : "Create new Cabin"}</Button>
      </FormRow>
    </Form >
  );
}

export default CreateCabinForm;
