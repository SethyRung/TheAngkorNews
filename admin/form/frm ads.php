<div class="container">
    <div class="head">
        <h2>Ads</h2>
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
                <label for="txtLink">Link</label>
                <input type="text" id="txtLink" name="txtLink">
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="sltLocation">Location</label>
                <select name="sltLocation" id="sltLocation">
                    <option value="In order">In order</option>
                    <option value="Top of page">Top of page</option>
                </select>
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

        </div>
        <div class="frm-container form-control">
            <label for="txtAds">Ads</label>
            <textarea name="txtAds" id="txtAds"></textarea>
            <button type="submit" name="btnSave" id="btnSave">
                <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
        </div>
    </form>
</div>