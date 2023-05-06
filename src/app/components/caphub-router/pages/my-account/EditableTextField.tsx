import { FC, useState, Dispatch, SetStateAction, useEffect } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import { StandardTextFieldProps } from "@mui/material/TextField";

interface EditableTextFieldProps extends StandardTextFieldProps {
  onEditSave: () => Promise<void>;
  value: string;
  setter: Dispatch<SetStateAction<string>>;
}

const EditableTextField: FC<EditableTextFieldProps> = ({
  onEditSave,
  setter,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(props.value || "");

  const handleSave = () => {
    onEditSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(props.value || "");
    setIsEditing(false);
  };

  useEffect(() => {
    setter(value);
  }, [value, setter]);

  return (
    <Box display="flex" alignItems="center">
      <TextField
        {...props}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        InputProps={{
          ...props.InputProps,
          readOnly: !isEditing,
        }}
      />
      {!isEditing && (
        <Button variant="outlined" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      )}
      {isEditing && (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default EditableTextField;
