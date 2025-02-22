import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-proile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
        //console.log
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div>
        <div>
          <div>
            <img src={profileData.image} alt="" />
          </div>
          <div>
            {/**doc info */}
            <p>{profileData.name}</p>
            <div>
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button>{profileData.experience}</button>
            </div>
            {/****doc ab */}
            <div>
              <p>About</p>
              <p>{profileData.about}</p>
            </div>
            <p>
              App fee:
              <span>
                {currency}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
          </div>
          <p>Address:</p>
          <p>
            {isEdit ? (
              <input
                type="text"
                onChange={(e) => {
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }));
                }}
                value={profileData.address.line1}
              />
            ) : (
              profileData.address.line2
            )}
            <br />
            {isEdit ? (
              <input
                type="text"
                onChange={(e) => {
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }));
                }}
                value={profileData.address.line2}
              />
            ) : (
              profileData.address.line2
            )}
          </p>
          <br />
          <p>{profileData.address.line2}</p>
        </div>

        <div>
          <input
            onChange={() =>
              isEdit &&
              setProfileData((prev) => ({
                ...prev,
                available: !prev.available,
              }))
            }
            checked={profileData.available}
            type="checkbox"
            name=""
            id=""
          />
          <label htmlFor="">Available</label>
        </div>
        {isEdit ? (
          <button onClick={updateProfile}>Save</button>
        ) : (
          <button onClick={() => setIsEdit(true)}>Edit</button>
        )}
      </div>
    )
  );
};

export default DoctorProfile;
