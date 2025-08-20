using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BertiniEventos.Application.Contratos;
using BertiniEventos.Application.Dtos;
using BertiniEventos.Domain.Identity;
using BertiniEventos.Persistence;
using BertiniEventos.Persistence.Contratos;
using Microsoft.AspNetCore.Identity;

namespace BertiniEventos.Application
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly IUserPersist _userPersist;
        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IUserPersist userPersist)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _userPersist = userPersist;

        }
        public Task<SignInResult> CheckUserPasswordAsync(UserUpdateDto userUpdateDto, string password)
        {
            throw new NotImplementedException();
        }

        public Task<UserDto> CreateAccountAsync(UserDto userDto)
        {
            throw new NotImplementedException();
        }

        public Task<UserUpdateDto> GetUserByUsernameAsync(string username)
        {
            throw new NotImplementedException();
        }

        public Task<UserUpdateDto> UpdateAccount(UserUpdateDto userUpdateDto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UserExists(string username)
        {
            throw new NotImplementedException();
        }
    }
}