import React, { useState, useEffect } from "react";
import "./user-profile.css";
import { useUserProfile } from "../../hooks/useUser";
import Loading from "../../components/base/Loading";
import toast from "react-hot-toast";

interface UserProfile {
  fullName: string;
  email: string;
  username: string;
  avatar?: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Nguyễn Văn A",
    email: "example@study4.com",
    username: "nguyenvana",
  });
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>({ ...profile });
  const [errors, setErrors] = useState<Partial<UserProfile>>({});

  const { data, isLoading, isError } = useUserProfile();

  useEffect(() => {
    if (data) {
      setProfile(data);
      setTempProfile(data); // đồng bộ profile tạm để chỉnh sửa
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error("Fail to load user data!");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<UserProfile> = {};
    if (!tempProfile.fullName.trim()) newErrors.fullName = "Fill full name";
    if (!tempProfile.email.trim()) newErrors.email = "Fill email";
    else if (!/^\S+@\S+\.\S+$/.test(tempProfile.email))
      newErrors.email = "Invalid email";
    if (!tempProfile.username.trim()) newErrors.username = "Fill username";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    setProfile(tempProfile);
    setEditMode(false);
    // Here you would typically make an API call to save the changes
    // await fetch('/api/user/profile', {
    //   method: 'PUT',
    //   body: JSON.stringify(tempProfile),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
    setErrors({});
  };

  return (
    <div className="user-profile-container">
      <h1>Your profile</h1>

      <div className="profile-card">
        {editMode ? (
          <>
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={tempProfile.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? "input-error" : ""}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={tempProfile.email}
                onChange={handleInputChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={tempProfile.username}
                onChange={handleInputChange}
                className={errors.username ? "input-error" : ""}
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>

            <div className="button-group">
              <button className="btn-save" onClick={handleSave}>
                Lưu thay đổi
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                Hủy
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Full name:</span>
                <span className="info-value">{profile.fullName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{profile.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Username:</span>
                <span className="info-value">{profile.username}</span>
              </div>
            </div>
            <button className="btn-edit" onClick={() => setEditMode(true)}>
              Chỉnh sửa thông tin
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
