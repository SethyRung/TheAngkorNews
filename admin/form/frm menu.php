<div class="container" style="width: 450px;">
    <div class="head">
        <h2>Menu</h2>
        <button id="btnClose"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <form class="frm">
        <div class="frm-container">
            <div class="form-control">
                <label for="txtID">ID</label>
                <input type="text" id="txtID" name="txtID" readOnly>
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="txtTitle">Title</label>
                <input type="text" id="txtTitle" name="txtTitle">
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="txtOD">Order Number</label>
                <input type="text" id="txtOD" name="txtOD" inputmode="numeric" pattern="[0-9]+">
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="sltStatus">Status</label>
                <select name="sltStatus" id="sltStatus">
                    <option value="Active">Active</option>
                    <option value="Deactivate">Deactivate</option>
                </select>
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="filePhoto">Photo</label>
                <div class="photo-box">
                    <input type="file" name="filePhoto" id="filePhoto">
                </div>
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>

            <button type="submit" name="btnSave" id="btnSave"><i class="fa-regular fa-floppy-disk"></i> Save</button>
        </div>
    </form>
</div>