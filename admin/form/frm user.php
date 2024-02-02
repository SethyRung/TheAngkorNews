<div class="container" style="width: 1002px;" id="container-user">
    <div class="head">
        <h2>User</h2>
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
                <label for="txtUserName">UserName</label>
                <input type="text" id="txtUserName" name="txtUserName">
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="txtEmail">Email</label>
                <input type="email" id="txtEmail" name="txtEmail">
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="form-control">
                <label for="sltUserType">User Type</label>
                <select name="sltUserType" id="sltUserType">
                    <option value="Client">Client</option>
                    <option value="Admin">Admin</option>
                </select>
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>

        </div>
        <div class="frm-container form-control">
            <label>Permission</label>
            <table>
                <tr>
                    <th>Function</th>
                    <th>Add</th>
                    <th>Edit</th>
                    <th>View</th>
                </tr>
                <tr>
                    <td>User</td>
                    <td><input type="checkbox" class="ckbUser" value="a"></td>
                    <td><input type="checkbox" class="ckbUser" value="e"></td>
                    <td><input type="checkbox" class="ckbUser" value="v" checked></td>
                </tr>
                <tr>
                    <td>Menu</td>
                    <td><input type="checkbox" class="ckbMenu" value="a"></td>
                    <td><input type="checkbox" class="ckbMenu" value="e"></td>
                    <td><input type="checkbox" class="ckbMenu" value="v" checked></td>
                </tr>
                <tr>
                    <td>News</td>
                    <td><input type="checkbox" class="ckbNews" value="a"></td>
                    <td><input type="checkbox" class="ckbNews" value="e"></td>
                    <td><input type="checkbox" class="ckbNews" value="v" checked></td>
                </tr>
                <tr>
                    <td>Ads</td>
                    <td><input type="checkbox" class="ckbAds" value="a"></td>
                    <td><input type="checkbox" class="ckbAds" value="e"></td>
                    <td><input type="checkbox" class="ckbAds" value="v" checked></td>
                </tr>
            </table>
            <button type="submit" name="btnSave" id="btnSave">
                <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
        </div>
    </form>
</div>